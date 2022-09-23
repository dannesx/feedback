import getWhatsapp from './functions/getWhatsapp.js'
import getExperimental from './functions/getExperimental.js'
import { url } from './modules/whatsappText.js'
import desempenhos from '../db/desempenho.json' assert { type: 'json' }

const whatsappBtn = document.querySelector('#whatsapp')
const gerarTextoBtn = document.querySelector('#gerar-texto')
const limparCamposBtn = document.querySelector('#limpar-campos')

// BLOCKED
let blocked = Array.from(document.querySelectorAll('form input'))
blocked = [...blocked, ...document.querySelectorAll('form textarea'), ...document.querySelectorAll('form select')]
blocked = blocked.slice(3)
blocked.forEach(block => block.setAttribute('disabled', 'true'))
// END

whatsappBtn.addEventListener('click', e => {
	e.preventDefault()
	let form = getWhatsapp()

	window.open(url(form))
})

gerarTextoBtn.addEventListener('click', e => {
	e.preventDefault()
	let form = getExperimental()

	console.log(form)
})