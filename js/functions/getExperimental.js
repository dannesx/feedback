export default function getExperimental() {
	const modulo = document.querySelector('#modulo').value
	const desempenho = document.querySelector('#desempenho').value
	const code = document.querySelector('#code').value
	const sugestao = document.querySelector('#sugestao').value
	const dificuldades = document.querySelector('#dificuldades').value
	const pontoAtencao = document.querySelector('#ponto-atencao').value
	const declaracoes = document.querySelector('#declaracoes').value

	return {
		modulo,
		desempenho,
		code,
		sugestao,
		dificuldades,
		pontoAtencao,
		declaracoes,
	}
}