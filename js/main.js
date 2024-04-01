import getForm from './functions/getForm.js'
import defaultText from './modules/defaultText.js'

const baseUrl = 'https://dannesx.github.io/feedback/db'
let ferramentas

const gerarTextoBtn = document.querySelector('#gerar-texto')
const ferramentaInput = document.querySelector('#ferramenta')
const alert = document.querySelector('.alert')

gerarTextoBtn.addEventListener('click', () => {
	const form = getForm()
	form.ferramenta = ferramentas.filter(item => item.id == form.ferramenta)[0]

	const text = defaultText(form)

	navigator.clipboard.writeText(text)
	alert.classList.add('show')
	setTimeout(() => alert.classList.remove('show'), 2000)
})

window.addEventListener('DOMContentLoaded', async () => {
	gerarTextoBtn.setAttribute('disabled', true)

	ferramentas = await fetch(`${baseUrl}/ferramentas.json`).then(res =>
		res.json()
	)

	gerarTextoBtn.removeAttribute('disabled')

	ferramentas.map(
		el =>
			(ferramentaInput.innerHTML += `<option value="${el.id}">${el.nome}</option>`)
	)
})