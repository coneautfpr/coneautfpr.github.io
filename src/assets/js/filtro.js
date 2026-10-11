// Filtra os itens [data-busca] da lista conforme o texto digitado.
// Sem JavaScript, o campo fica oculto e a lista aparece inteira.
const campo = document.querySelector("[data-busca-campo]");
const entrada = campo?.querySelector("input");
const contagem = campo?.querySelector("[data-contagem]");
const itens = document.querySelectorAll("[data-lista] [data-busca]");
const vazio = document.querySelector("[data-vazio]");

const normalizar = (texto) => texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function mostrarContagem(visiveis, buscando) {
	if (!contagem) return;
	const { singular, plural } = contagem.dataset;
	const nome = (n) => (n === 1 ? singular : plural);
	contagem.textContent = buscando
		? `${visiveis} de ${itens.length} ${nome(itens.length)}`
		: `${itens.length} ${nome(itens.length)}`;
}

function filtrar() {
	const termos = normalizar(entrada.value).split(/s+/).filter(Boolean);
	let visiveis = 0;
	for (const item of itens) {
		const mostra = termos.every((termo) => item.dataset.busca.includes(termo));
		item.hidden = !mostra;
		if (mostra) visiveis++;
	}
	if (vazio) vazio.hidden = visiveis > 0;
	mostrarContagem(visiveis, termos.length > 0);
}

if (entrada) {
	campo.hidden = false;
	entrada.addEventListener("input", filtrar);
	// Esc limpa a busca
	entrada.addEventListener("keydown", (evento) => {
		if (evento.key === "Escape" && entrada.value) { entrada.value = ""; filtrar(); }
	});
	filtrar();
}
