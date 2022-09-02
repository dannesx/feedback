const inputs = document.querySelectorAll('input')
const textareas = document.querySelectorAll('textarea')
const buttons = document.querySelectorAll('button')

inputs.forEach(input => {
	input.setAttribute('disabled', 'true')
})

textareas.forEach(txtarea => {
	txtarea.setAttribute('disabled', 'true')
})

buttons.forEach(button => {
	button.setAttribute('disabled', 'true')
})

document.querySelector('select').setAttribute('disabled', 'true')