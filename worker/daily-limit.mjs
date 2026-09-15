const dayFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' })

export function dailyWindow(now) {
	const day = dayFormatter.format(now)
	let low = Math.floor(now / 1000)
	let high = low + 27 * 3600
	while (low + 1 < high) {
		const middle = Math.floor((low + high) / 2)
		if (dayFormatter.format(middle * 1000) === day) low = middle
		else high = middle
	}
	return { day, retryAfter: Math.max(1, Math.ceil((high * 1000 - now) / 1000)) }
}

// A single persistent object shares the daily budget across all IPs and locations.
export class DailySummaryLimit {
	constructor(ctx) { this.storage = ctx.storage }

	async fetch() {
		const result = await this.storage.transaction(async storage => {
			const { day, retryAfter } = dailyWindow(Date.now())
			const saved = await storage.get('daily')
			const count = saved?.day === day ? saved.count : 0
			if (count >= 70) return { success: false, retryAfter }
			await storage.put('daily', { day, count: count + 1 })
			return { success: true }
		})
		return Response.json(result)
	}
}

export async function checkDailyLimit(namespace) {
	const object = namespace.get(namespace.idFromName('global-summary-budget'))
	const response = await object.fetch('https://rate-limit.internal/check', { method: 'POST' })
	if (!response.ok) throw new Error('Daily limiter unavailable')
	return response.json()
}
