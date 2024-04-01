export default function getForm() {
	const ferramenta = document.querySelector('#ferramenta').value
	const temaAula = document.querySelector('#tema').value
	const aula = document.querySelector('#aula').value
	const desafio = document.querySelector('#desafio').value
	const recomendada = document.querySelector("#recomendada").value

	return {
		ferramenta,
		temaAula,
		aula,
		desafio,
		recomendada
	}
}
