export default function defaultText({
	prof,
	ferramenta,
	turma,
	temaAula,
	aula,
	projeto,
	desafio,
	complementar,
}) {
	return `
📆 Data: ${getNowDate()}
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
}

function getNowDate() {
	const today = new Date()
	const date = today.getDate()
	const month = today.getMonth() + 1
	const year = today.getFullYear()
	const separator = '/'

	return `${date < 10 ? '0' + date : date}${separator}${month < 10 ? '0' + month : month}${separator}${year}`
}
