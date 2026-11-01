// Filtra os itens [data-busca] da lista conforme o texto digitado.
// Sem JavaScript, o campo fica oculto e a lista aparece inteira.
// O termo buscado fica no endereço (?q=...) e é destacado nos textos marcados com [data-destacar].
const campo = document.querySelector("[data-busca-campo]");
const entrada = campo?.querySelector("input");
const contagem = campo?.querySelector("[data-contagem]");
const itens = document.querySelectorAll("[data-lista] [data-busca]");
const vazio = document.querySelector("[data-vazio]");

const normalizar = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Guarda o texto original de cada trecho destacável, para poder refazer o destaque a cada busca.
const destacaveis = [...document.querySelectorAll("[data-lista] [data-destacar]")].map((el) => ({ el, texto: el.textContent }));

function mostrarContagem(visiveis, buscando) {
	if (!contagem) return;
	const { singular, plural } = contagem.dataset;
	const nome = (n) => (n === 1 ? singular : plural);
	contagem.textContent = buscando
		? `${visiveis} de ${itens.length} ${nome(itens.length)}`
		: `${itens.length} ${nome(itens.length)}`;
}

// Encontra os trechos do texto original que correspondem aos termos, ignorando acentos e maiúsculas.
// Devolve intervalos [início, fim) em posições do texto original, já unidos quando se sobrepõem.
function trechos(texto, termos) {
	let normal = "";
	const origem = []; // posição no texto normalizado -> posição no texto original
	for (let i = 0; i < texto.length; i++) {
		const parte = normalizar(texto[i]);
		for (let j = 0; j < parte.length; j++) origem.push(i);
		normal += parte;
	}
	const intervalos = [];
	for (const termo of termos) {
		let pos = normal.indexOf(termo);
		while (pos !== -1) {
			intervalos.push([origem[pos], origem[pos + termo.length - 1] + 1]);
			pos = normal.indexOf(termo, pos + termo.length);
		}
	}
	intervalos.sort((a, b) => a[0] - b[0]);
	const unidos = [];
	for (const [ini, fim] of intervalos) {
		const ultimo = unidos[unidos.length - 1];
		if (ultimo && ini <= ultimo[1]) ultimo[1] = Math.max(ultimo[1], fim);
		else unidos.push([ini, fim]);
	}
	return unidos;
}

// Reescreve o trecho com <mark> nos termos encontrados (só com nós de texto, sem innerHTML).
function destacar({ el, texto }, termos) {
	const partes = termos.length ? trechos(texto, termos) : [];
	if (!partes.length) { el.textContent = texto; return; }
	const novo = document.createDocumentFragment();
	let pos = 0;
	for (const [ini, fim] of partes) {
		if (ini > pos) novo.append(texto.slice(pos, ini));
		const marca = document.createElement("mark");
		marca.textContent = texto.slice(ini, fim);
		novo.append(marca);
		pos = fim;
	}
	if (pos < texto.length) novo.append(texto.slice(pos));
	el.replaceChildren(novo);
}

// Mantém o termo no endereço da página, sem criar uma entrada nova no histórico a cada tecla.
function atualizarEndereco(valor) {
	const url = new URL(location.href);
	if (valor.trim()) url.searchParams.set("q", valor.trim());
	else url.searchParams.delete("q");
	history.replaceState(null, "", url);
}

function filtrar() {
	const termos = normalizar(entrada.value).trim().split(/\s+/).filter(Boolean);
	let visiveis = 0;
	for (const item of itens) {
		const mostra = termos.every((termo) => item.dataset.busca.includes(termo));
		item.hidden = !mostra;
		if (mostra) visiveis++;
	}
	for (const d of destacaveis) destacar(d, termos);
	if (vazio) vazio.hidden = visiveis > 0;
	mostrarContagem(visiveis, termos.length > 0);
	atualizarEndereco(entrada.value);
}

if (entrada) {
	campo.hidden = false;
	// Recupera a busca vinda do endereço (link compartilhado ou volta de uma notícia)
	const inicial = new URLSearchParams(location.search).get("q");
	if (inicial) entrada.value = inicial;
	entrada.addEventListener("input", filtrar);
	// Esc limpa a busca
	entrada.addEventListener("keydown", (evento) => {
		if (evento.key === "Escape" && entrada.value) { entrada.value = ""; filtrar(); }
	});
	filtrar();
}
