import aeText from './modules/aeText.js'
let professores

const gerarTextoBtn = document.querySelector('#gerar-texto')
const professorInput = document.querySelector('#professor')
const alert = document.querySelector('.alert')
const form = document.querySelector('form')

form.addEventListener('submit', e => {
	e.preventDefault()
	const data = Object.fromEntries(new FormData(form).entries())
	data.professor = professores.filter(
		item => item.id == data.professor
	)[0].nome

	console.log(data)
	let text = aeText(data)

	navigator.clipboard.writeText(text)
	alert.classList.add('show')
	setTimeout(() => alert.classList.remove('show'), 2000)
})

window.addEventListener('DOMContentLoaded', async () => {
	gerarTextoBtn.setAttribute('disabled', true)

	professores = await fetch(`../db/professores.json`).then(res =>
		res.json()
	)

	gerarTextoBtn.removeAttribute('disabled')

	professores.map(
		el =>
			(professorInput.innerHTML += `<option value="${el.id}">${el.nome}</option>`)
	)
})