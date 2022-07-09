import getForm from './functions/getForm.js'
import defaultText from './defaultText.js'

const btn = document.querySelector('#gerar-texto')
const text = document.querySelector('#texto')

btn.addEventListener('click', () => {
	let object = getForm()
	console.log((text.innerText = defaultText(object)))
})