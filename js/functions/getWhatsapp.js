export default function getWhatsapp() {
	const student = document.querySelector('#nome-aluno').value
	const publishedUrl = document.querySelector('#itch-io').value
	const archiveUrl = document.querySelector('#google-drive').value

	return {
		student,
		publishedUrl,
		archiveUrl,
	}
}
