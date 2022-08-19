import getForm from './functions/getForm.js'
import defaultText from './defaultText.js'
import professores from '../db/professores.json' assert { type: 'json' }
import ferramentas from '../db/ferramentas.json' assert { type: 'json' }

const gerarTextoBtn = document.querySelector('#gerar-texto')
const limparCamposBtn = document.querySelector('#limpar-campos')
const turmaInput = document.querySelector('#turma')
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

	form = { ...form, professor, ferramenta, temConteudo }
	navigator.clipboard.writeText(defaultText(form))
	alert.classList.add('show')
	setTimeout(() => alert.classList.remove('show'), 2000)
})

limparCamposBtn.addEventListener('click', () => {
	turmaInput.value = ''
	temaInput.value = ''
	textareas.forEach(txt => (txt.value = ''))
})