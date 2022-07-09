export default function getForm() {
	const prof = document.querySelector('#prof').value
	const ferramenta = document.querySelector('#ferramenta').value
	const turma = document.querySelector('#turma').value
	const temaAula = document.querySelector('#tema').value
	const aula = document.querySelector('#aula').value
	const projeto = document.querySelector('#projeto').value
	const desafio = document.querySelector('#desafio').value
	const complementar = document.querySelector('#complementar').value

	return {
		prof,
		ferramenta,
		turma,
		temaAula,
		aula,
		projeto,
		desafio,
		complementar,
	}
}
