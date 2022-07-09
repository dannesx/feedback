const btn = document.querySelector('#gerar-texto')
const text = document.querySelector('#texto')

btn.addEventListener('click', () => {
	let obj = getForm()
	setText(obj)
	console.log(text)
})

function getForm() {
	const prof = document.querySelector('#prof').value
	const ferramenta = document.querySelector('#ferramenta').value
	const turma = document.querySelector('#turma').value
	const temaAula = document.querySelector('#tema').value
	const aula = document.querySelector('#aula').value
	const projeto = document.querySelector('#projeto').value
	const desafio = document.querySelector('#desafio').value
	const complementar = document.querySelector('#complementar').value

	return {
		prof,
		ferramenta,
		turma,
		temaAula,
		aula,
		projeto,
		desafio,
		complementar,
	}
}

function setText({
	prof,
	ferramenta,
	turma,
	temaAula,
	aula,
	projeto,
	desafio,
	complementar,
}) {
	const today = new Date()
	const defaultText = `
📆 Data: ${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}
😃 Turma: ${turma}
📚 Tema Aula: ${temaAula}
🧰 Ferramenta: ${ferramenta}

👩‍🏫👨‍🏫💬 Olá pais, mães e responsáveis! É a professor/a *${prof}* passando o feedback da aula! 🪄

*O que fizemos hoje em aula?*
${aula}

*Sobre o projeto*
${projeto}

*Qual ferramenta usamos e como acessar/instalar?*
Utilizamos ${ferramenta}, é instalado no computador.
Link: https://www.kodugamelab.com/
Vídeo explicando como instalar: https://www.youtube.com/watch?v=NzML0GCg57k

👨‍💻👩‍💻*Qual Desafio para a próxima aula?*
${desafio}

*Prática complementar recomendada para semana*: 
${complementar}

Em caso de dúvidas, chama a gente.
Desejamos bons estudos e uma ótima semana!
   `

	text.innerText = defaultText
}
