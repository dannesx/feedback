import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const api = 'https://feedback-resumo.ctrlplay-feedback.workers.dev/resumo'
const types = { css: 'text/css; charset=utf-8', html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', json: 'application/json; charset=utf-8' }

createServer(async (request, response) => {
	const path = new URL(request.url, 'http://localhost').pathname
	response.setHeader('Cache-Control', 'no-store')
	try {
		if (path === '/api/resumo' && request.method === 'POST') {
			let body = ''
			for await (const chunk of request) {
				body += chunk
				if (Buffer.byteLength(body) > 4096) {
					response.writeHead(413).end()
					return
				}
			}
			const upstream = await fetch(api, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Origin: 'https://dannesx.github.io' },
				body,
				signal: AbortSignal.timeout(40000),
			})
			response.writeHead(upstream.status, { 'Content-Type': 'application/json' }).end(await upstream.text())
			return
		}
		if (request.method !== 'GET') { response.writeHead(405).end(); return }
		if (path === '/js/config.js') {
			response.writeHead(200, { 'Content-Type': types.js }).end("export const SUMMARY_API_URL = '/api/resumo'\n")
			return
		}
		// Serve only the site's public files, never secrets or repository internals.
		const file = path === '/' ? 'index.html' : path.slice(1)
		if (!/^(?:index\.html|ae\.html|whatsapp\.html|css\/[\w-]+\.css|js\/(?:[\w-]+\/)*[\w-]+\.js|db\/[\w-]+\.json)$/.test(file)) {
			response.writeHead(404).end(); return
		}
		const content = await readFile(fileURLToPath(new URL(file, root)))
		response.writeHead(200, { 'Content-Type': types[file.split('.').pop()] }).end(content)
	} catch (error) {
		if (error.code === 'ENOENT') { response.writeHead(404).end(); return }
		console.error('Falha no servidor local:', error.cause?.code || error.message)
		response.writeHead(502, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Não foi possível conectar ao Worker. Tente novamente em instantes.' }))
	}
}).listen(8000, '127.0.0.1', () => console.log('Feedback: http://localhost:8000 — IA conectada ao Worker publicado.'))
