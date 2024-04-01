export default function defaultText({
	ferramenta,
	temaAula,
	aula,
	desafio,
	recomendada,
}) {
	return `⭐ *${temaAula ? `Tema: ${temaAula}` : 'Resumo da Aula'}* ⭐
${aula}
	
📢 *Desafio da Semana* 📢
${desafio}${recomendada ? `\n🚨 *Extra:* ${recomendada}` : ""}
	
🧰 *Ferramenta:* ${ferramenta.nome}
🔗 *Link:* ${ferramenta.link}

_Bons estudos e uma ótima semana!_ ✨🚀`
}
