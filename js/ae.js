import getWhatsapp from './functions/getWhatsapp.js'
import whatsappText from './modules/whatsappText.js'

const whatsappBtn = document.querySelector('#whatsapp')
const limparCamposBtn = document.querySelector('#limpar-campos')
const alert = document.querySelector('.alert')

whatsappBtn.addEventListener('click', e => {
	e.preventDefault()
	let form = getWhatsapp()

	let text = whatsappText(form)

	navigator.clipboard.writeText(text)
	alert.classList.add('show')
	setTimeout(() => alert.classList.remove('show'), 2000)
})