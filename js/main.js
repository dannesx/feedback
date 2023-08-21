import getForm from './functions/getForm.js'
import defaultText from './modules/defaultText.js'
let professores
let ferramentas

const gerarTextoBtn = document.querySelector('#gerar-texto')
const limparCamposBtn = document.querySelector('#limpar-campos')
const temaInput = document.querySelector('#tema')
const textareas = document.querySelectorAll('textarea.form-control')
const alert = document.querySelector('.alert')

gerarTextoBtn.addEventListener('click', () => {
	let form = getForm()
	let temConteudo = []

	textareas.forEach(txt =>
		txt.value !== '' ? temConteudo.push(true) : temConteudo.push(false)
	)

	let professor = professores[form.prof - 1]
	let ferramenta = ferramentas[form.ferramenta - 1]

	delete form.prof
	delete form.ferramenta

	let text = defaultText({ ...form, professor, ferramenta, temConteudo })
	navigator.clipboard.writeText(text)
	alert.classList.add('show')
	setTimeout(() => alert.classList.remove('show'), 2000)
})

limparCamposBtn.addEventListener('click', () => {
	temaInput.value = ''
	textareas.forEach(txt => (txt.value = ''))
})

window.addEventListener("load", async () => {
	gerarTextoBtn.setAttribute("disabled", true)
	professores = await fetch("../db/professores.json").then(res => res.json())
	ferramentas = await fetch("../db/ferramentas.json").then(res => res.json())
	gerarTextoBtn.removeAttribute("disabled")
})