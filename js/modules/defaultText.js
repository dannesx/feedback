export default function defaultText({
	professor,
	ferramenta,
	temaAula,
	aula,
	desafio,
	complementar,
	temConteudo,
}) {
	return `${
	professor.pronome === 'ele/dele' ? '👨‍🏫' : '👩‍🏫'
}💬 Olá pais, mães e responsáveis! É ${
		professor.pronome === 'ele/dele' ? 'o prof.' : 'a prof.'
	} *${professor.nome}* passando o feedback da aula!
	
📚 *A última aula foi sobre _${temaAula}_* 
${temConteudo[0] ? `${aula}\n` : ''}${temConteudo[1] ? `\n${professor.pronome === 'ele/dele' ? '👨‍💻' : '👩‍💻'} *Qual desafio para a próxima aula?*\n${desafio}\n` : ''}${temConteudo[2] ? `\n🤩 *Prática complementar recomendada para semana*\n${complementar}\n` : ''}
🧰 *Qual ferramenta usamos e como acessar/instalar?*
Utilizamos *${ferramenta.nome}*, é ${
		ferramenta.download
			? 'instalado no computador'
			: 'acessado no navegador (ex: Google Chrome)'
	}.
Link: ${ferramenta.links.link}

Em caso de dúvidas, chama a gente.
Desejamos bons estudos e uma ótima semana! ✨🚀
`
}