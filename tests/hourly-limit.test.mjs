import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HourlySummaryLimit } from '../worker/hourly-limit.mjs'

function storage() {
 const values = new Map()
 let queue = Promise.resolve()
 return {
  get: async key => structuredClone(values.get(key)),
  put: async (key, value) => values.set(key, structuredClone(value)),
  delete: async key => values.delete(key),
  setAlarm: async () => {},
  transaction(callback) {
   const result = queue.then(() => callback(this))
   queue = result.catch(() => {})
   return result
  },
 }
}
test('5 concurrent requests succeed; sixth is blocked, persisted across instances, expires after 1h', async t => {
 let now = 10000000
 t.mock.method(Date, 'now', () => now)
 const state = { storage: storage() }
 const limit = new HourlySummaryLimit(state)
 const results = await Promise.all(Array.from({ length: 6 }, async () => (await limit.fetch()).json()))
 assert.equal(results.filter(r => r.success).length, 5)
 assert.equal(results[5].retryAfter, 3600)
 now += 60000
 const restored = new HourlySummaryLimit(state)
 assert.deepEqual(await (await restored.fetch()).json(), { success: false, retryAfter: 3540 })
 now += 3540000
 assert.equal((await (await restored.fetch()).json()).success, true)
})
test('rolling window releases only expired slots; separate objects have separate quotas', async t => {
 let now = 10000000
 t.mock.method(Date, 'now', () => now)
 const state = { storage: storage() }
 const limit = new HourlySummaryLimit(state)
 await limit.fetch()
 now += 600000
 for (let i = 0; i < 4; i++) await limit.fetch()
 now += 3000000
 assert.equal((await (await limit.fetch()).json()).success, true)
 assert.equal((await (await limit.fetch()).json()).success, false)
 assert.equal((await (await new HourlySummaryLimit({ storage: storage() }).fetch()).json()).success, true)
 now += 3600000
 await limit.alarm()
 assert.equal(await state.storage.get('requests'), undefined)
})
