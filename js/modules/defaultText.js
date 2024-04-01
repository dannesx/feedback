export default function defaultText({
	ferramenta,
	temaAula,
	aula,
	desafio
}) {
	return `💫 *${temaAula ? temaAula : "Resumo da Aula"}* 🚀
${aula}
	
📢 *Desafio da Semana* 📢
${desafio}
	
🧰 *Ferramenta:* ${ferramenta.nome}
🔗 *Link:* ${ferramenta.link}

_Desejamos bons estudos e uma ótima semana!_ ✨🚀`
}
