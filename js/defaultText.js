export default function defaultText({
	professor,
	ferramenta,
	turma,
	temaAula,
	aula,
	projeto,
	desafio,
	complementar,
	temConteudo,
}) {
	return `
📆 Data: ${getNowDate()}
😃 Turma: ${turma}
📚 Tema Aula: ${temaAula}
🧰 Ferramenta: ${ferramenta.nome}

${
	professor.pronome === 'ele/dele' ? '👨‍🏫' : '👩‍🏫'
}💬 Olá pais, mães e responsáveis! É ${
		professor.pronome === 'ele/dele' ? 'o professor' : 'a professora'
	} *${professor.nome}* passando o feedback da aula! 🪄
${temConteudo[0] ? `\n*O que fizemos hoje em aula?*\n${aula}\n` : ''}${temConteudo[1] ? `\n*Sobre o projeto*\n${projeto}\n` : ''}
*Qual ferramenta usamos e como acessar/instalar?*
Utilizamos ${ferramenta.nome}, é ${
		ferramenta.download
			? 'instalado no computador'
			: 'acessado no navegador (ex: Google Chrome)'
	}.
Link: ${ferramenta.links.link}
${temConteudo[2] ? `\n${professor.pronome === 'ele/dele' ? '👨‍💻' : '👩‍💻'} *Qual Desafio para a próxima aula?*\n${desafio}\n` : ''} ${temConteudo[3] ? `\n*Prática complementar recomendada para semana*\n${complementar}\n` : ''}
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

	return `${date < 10 ? '0' + date : date}${separator}${
		month < 10 ? '0' + month : month
	}${separator}${year}`
}
