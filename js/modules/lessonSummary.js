import { SUMMARY_API_URL } from '../config.js'

const button = document.querySelector('#gerar-resumo')
const summary = document.querySelector('#aula')
const topic = document.querySelector('#tema')
const tool = document.querySelector('#ferramenta')
const status = document.querySelector('#resumo-status')
let pending

function cancel() {
	if (pending) {
		pending.abort()
		pending = undefined
		button.disabled = false
		button.textContent = '✨ Gerar resumo'
		summary.removeAttribute('aria-busy')
	}
	status.textContent = ''
}

for (const field of [topic, tool, summary]) field.addEventListener('input', cancel)
summary.form.addEventListener('reset', cancel)

button.addEventListener('click', async () => {
	if (pending) return
	const tema = topic.value.trim()
	const ferramenta = tool.value === '---' ? '' : tool.selectedOptions[0]?.textContent.trim()
	if (!tema || !ferramenta) {
		status.textContent = 'Preencha o tema da aula e selecione a ferramenta.'
		;(!tema ? topic : tool).focus()
		return
	}
	if (!SUMMARY_API_URL) {
		status.textContent = 'A geração de resumos ainda não foi configurada. Você pode escrever o resumo normalmente.'
		return
	}
	const controller = new AbortController()
	pending = controller
	const timeout = setTimeout(() => controller.abort(), 45000)
	button.disabled = true
	button.innerHTML = '<span class="loading loading-spinner loading-sm" aria-hidden="true"></span> Gerando…'
	summary.setAttribute('aria-busy', 'true')
	status.textContent = 'Preparando uma sugestão de 200 a 300 caracteres…'
	try {
		const response = await fetch(SUMMARY_API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ tema, ferramenta }),
			signal: controller.signal,
		})
		const data = await response.json()
		if (!response.ok) throw new Error(data.error || 'Não foi possível gerar o resumo. Tente novamente.')
		if (typeof data.resumo !== 'string' || [...data.resumo].length < 200 || [...data.resumo].length > 300) {
			throw new Error('A sugestão veio fora do tamanho esperado. Tente novamente.')
		}
		if (pending !== controller) return
		summary.value = data.resumo
		status.textContent = `${[...data.resumo].length} caracteres. Revise a sugestão antes de usar.`
	} catch (error) {
		if (pending !== controller) return
		status.textContent = error.name === 'AbortError'
			? 'A geração demorou demais. Tente novamente.'
			: error instanceof TypeError || error instanceof SyntaxError
				? 'Não foi possível conectar ao serviço. Tente novamente.'
				: error.message
	} finally {
		clearTimeout(timeout)
		if (pending === controller) {
			pending = undefined
			button.disabled = false
			button.textContent = '✨ Gerar resumo'
			summary.removeAttribute('aria-busy')
		}
	}
})
