const HOUR = 60 * 60 * 1000

// One Durable Object per IP hash; transactions serialize concurrent requests.
export class HourlySummaryLimit {
	constructor(ctx) { this.storage = ctx.storage }

	async fetch() {
		const result = await this.storage.transaction(async storage => {
			const now = Date.now()
			const timestamps = (await storage.get('requests') || []).filter(time => time > now - HOUR)
			if (timestamps.length >= 5) {
				return { success: false, retryAfter: Math.max(1, Math.ceil((timestamps[0] + HOUR - now) / 1000)) }
			}
			timestamps.push(now)
			await storage.put('requests', timestamps)
			await storage.setAlarm(now + HOUR)
			return { success: true }
		})
		return Response.json(result)
	}

	async alarm() {
		await this.storage.transaction(async storage => {
			const now = Date.now()
			const timestamps = (await storage.get('requests') || []).filter(time => time > now - HOUR)
			if (timestamps.length) {
				await storage.put('requests', timestamps)
				await storage.setAlarm(timestamps[timestamps.length - 1] + HOUR)
			} else {
				await storage.delete('requests')
			}
		})
	}
}

export async function checkHourlyLimit(namespace, ip) {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))
	const key = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
	const object = namespace.get(namespace.idFromName(key))
	const response = await object.fetch('https://rate-limit.internal/check', { method: 'POST' })
	if (!response.ok) throw new Error('Rate limiter unavailable')
	return response.json()
}
