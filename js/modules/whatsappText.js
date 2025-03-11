const tutorialUrl = 'https://youtu.be/mlvvNPrL7bQ'
const platformUrl = 'https://editor.construct.net/'

export default function whatsappText({ aluno, publicado, arquivo }) {
	return `*⭐ Aula Experimental - ${aluno} ⭐*
_Agora você pode jogar em casa com a família e os amigos, e também editar o seu projeto pra ficar ainda mais legal!_ 😁

*🎮 Projeto publicado:*
${publicado}
*🎮 Arquivo do projeto:*
${arquivo}
*🎬 Vídeo tutorial:*
${tutorialUrl}
*🧰 Plataforma:*
${platformUrl}

_Bora aprender tecnologia com a *Ctrl+Play*! ✨🚀_`
}
