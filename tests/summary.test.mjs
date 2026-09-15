import { test } from 'node:test'
import assert from 'node:assert/strict'
import worker from '../worker/index.mjs'

const origin = 'https://dannesx.github.io'
const limiter = result => ({ idFromName: key => key, get: () => ({ fetch: async () => Response.json(result) }) })
const env = { ALLOWED_ORIGINS: origin, GEMINI_API_KEY: 'test-secret', SUMMARY_RATE_LIMITER: limiter({ success: true }) }
const request = (body = { tema: 'Laços', ferramenta: 'Python' }, options = {}) => new Request('https://example.com/resumo', {
 method: 'POST', headers: { Origin: origin, 'CF-Connecting-IP': '192.0.2.1', 'Content-Type': 'application/json' }, body: JSON.stringify(body), ...options,
})
const summary = 'Na aula, foram abordados os laços de repetição em Python, explicando como executar instruções várias vezes. O conteúdo inclui o uso de condições e sequências para organizar repetições e compreender o fluxo de execução do código.'
const result = text => Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text }] } }] })

test('returns a valid summary and sends only topic and tool as user data', async t => {
 let sent
 t.mock.method(globalThis, 'fetch', async (url, options) => { sent = JSON.parse(options.body); assert.equal(options.headers['x-goog-api-key'], 'test-secret'); return result(summary) })
 const response = await worker.fetch(request({ tema: 'Laços', ferramenta: 'Python', aluno: 'Do not send' }), env)
 assert.equal(response.status, 200)
 assert.deepEqual(await response.json(), { resumo: summary })
 assert.deepEqual(JSON.parse(sent.contents[0].parts[0].text), { tema: 'Laços', ferramenta: 'Python' })
 assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin)
})
test('retries invalid length once and never returns an invalid summary', async t => {
 const mock = t.mock.method(globalThis, 'fetch', async () => result('Muito curto.'))
 assert.equal((await worker.fetch(request(), env)).status, 502)
 assert.equal(mock.mock.callCount(), 2)
})
test('accepts a corrected second generation', async t => {
 let count = 0
 t.mock.method(globalThis, 'fetch', async () => result(++count === 1 ? 'Curto' : summary))
 assert.equal((await worker.fetch(request(), env)).status, 200)
 assert.equal(count, 2)
})
test('rejects invalid input without calling provider', async t => {
 const mock = t.mock.method(globalThis, 'fetch', () => assert.fail('unexpected provider request'))
 for (const body of [null, {}, { tema: 'x'.repeat(201), ferramenta: 'Python' }, { tema: 'Tema', ferramenta: '---' }]) assert.equal((await worker.fetch(request(body), env)).status, 400)
 assert.equal((await worker.fetch(request({ tema: 'x'.repeat(5000) }), env)).status, 413)
 assert.equal((await worker.fetch(request({}, { body: '{' }), env)).status, 400)
 assert.equal(mock.mock.callCount(), 0)
})
test('CORS, methods, missing config and rate limits', async () => {
 assert.equal((await worker.fetch(request({}, { headers: { Origin: 'https://other.com' } }), env)).status, 403)
 assert.equal((await worker.fetch(request({}, { method: 'OPTIONS', body: undefined }), env)).status, 204)
 assert.equal((await worker.fetch(request({}, { method: 'GET', body: undefined }), env)).status, 405)
 assert.equal((await worker.fetch(request(), { ...env, GEMINI_API_KEY: '' })).status, 503)
 assert.equal((await worker.fetch(request(), { ...env, SUMMARY_RATE_LIMITER: limiter({ success: false, retryAfter: 3600 }) })).status, 429)
})
test('provider quota, failures and blocked output are handled without leaking details', async t => {
 const mock = t.mock.method(globalThis, 'fetch', async () => new Response('secret provider detail', { status: 429 }))
 let response = await worker.fetch(request(), env)
 assert.equal(response.status, 429)
 assert.doesNotMatch(await response.text(), /secret/)
 mock.mock.mockImplementation(async () => { throw new DOMException('timeout', 'TimeoutError') })
 response = await worker.fetch(request(), env)
 assert.equal(response.status, 502)
 assert.match(await response.text(), /demorou/)
 mock.mock.mockImplementation(async () => Response.json({ candidates: [{ finishReason: 'SAFETY', content: { parts: [{ text: summary }] } }] }))
 assert.equal((await worker.fetch(request(), env)).status, 502)
})
