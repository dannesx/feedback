import getForm from './functions/getForm.js'
import defaultText from './defaultText.js'
import professores from '../db/professores.json' assert { type: 'json' }
import ferramentas from '../db/ferramentas.json' assert { type: 'json' }

const btn = document.querySelector('#gerar-texto')
const textareas = document.querySelectorAll('textarea.form-control')
const alert = document.querySelector('.alert')

btn.addEventListener('click', () => {
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
	alert.classList.remove('invisible')
	setTimeout(() => alert.classList.add('invisible'), 2000)
})
