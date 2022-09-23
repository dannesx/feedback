const phone = '5511911384094'
const tutorialUrl = 'https://youtu.be/mlvvNPrL7bQ'
const platformUrl = 'https://editor.construct.net/'

export function url({ student, publishedUrl, archiveUrl }) {
	student = student.replace(' ', '%20')

	return `https://api.whatsapp.com/send?phone=${phone}&text=*Aula%20Experimental%20-%20${student}*%0A%0A🕹️%20_Link%20para%20jogar%20o%20jogo%20no%20navegador:_%0A${publishedUrl}%0A%0A🎞️%20_Tutorial%20para%20abrir%20o%20projeto:_%0A${tutorialUrl}%0A%0A🖥️%20_Site%20para%20abrir%20o%20arquivo%20do%20jogo:_%0A${platformUrl}%0A%0A⬇️%20_Link%20para%20baixar%20o%20projeto:_%0A${archiveUrl}`
}
