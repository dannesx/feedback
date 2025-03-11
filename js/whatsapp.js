import whatsappText from './modules/whatsappText.js'

const alert = document.querySelector('.alert')
const form = document.querySelector('form')

form.addEventListener("submit", e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form).entries())

    let text = whatsappText(data)

    navigator.clipboard.writeText(text)
	alert.classList.add('show')
	setTimeout(() => alert.classList.remove('show'), 2000)
})