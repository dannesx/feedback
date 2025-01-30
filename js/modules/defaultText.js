export default function defaultText({
	ferramenta,
	temaAula,
	aula,
	desafio,
	recomendada,
	desafioPortal,
}) {
	return `⭐ *${temaAula ? temaAula : 'Resumo da Aula'}* ⭐
${aula}
	
📢 *Desafio da Semana* 📢
${desafioPortal ? "Desafio publicado no portal: https://portal.ctrlplay.com.br/" : desafio}${recomendada ? `\n🚨 *Extra:* ${recomendada}` : ""}
	
🧰 *Ferramenta:* ${ferramenta.nome}
🔗 *Link:* ${ferramenta.link}

_Bons estudos e uma ótima semana!_ ✨🚀`
}
