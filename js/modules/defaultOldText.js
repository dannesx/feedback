export default function defaultOldText({
	ferramenta,
	temaAula,
	aula,
	desafio,
	recomendada,
}) {
	return `👩‍🏫💬 Olá mães, pais e responsáveis! Prof. passando o feedback da aula!
	
📚 *A última aula foi sobre _${temaAula}_*
${aula}

👩‍💻 *Qual desafio para a próxima aula?*
${desafio} ${
		recomendada
			? `\n\n🤩 *Prática complementar recomendada para semana*\n${recomendada}`
			: ''
	}

🧰 *Qual ferramenta usamos e como acessar/instalar?*
Utilizamos ${ferramenta.nome}, ${
		ferramenta.online
			? 'é acessado no navegador (ex: Google Chrome)'
			: 'é instalado no computador'
	}
Link: ${ferramenta.link}

_Em caso de dúvidas, chama a gente._
_Desejamos bons estudos e uma ótima semana!_ ✨🚀`
}
