import * as yaml from "js-yaml";

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
	"agosto", "setembro", "outubro", "novembro", "dezembro"];

export default function (eleventyConfig) {
	eleventyConfig.addDataExtension("yaml,yml", (conteudo) => yaml.load(conteudo));

	eleventyConfig.addPassthroughCopy("src/assets");
	eleventyConfig.addPassthroughCopy("src/CNAME");
	// Fotos das notícias (ficam junto do index.md de cada notícia). Atenção: um padrão restrito a
	// "src/noticias/**/*.{...}" faz o vigia do "npm start" (chokidar 3) ignorar edições nos .md
	// dessa pasta; por isso o padrão cobre todo o src/.
	eleventyConfig.addPassthroughCopy("src/**/*.{webp,jpg,jpeg,png}");

	// 2025-03-04 -> "4 de março de 2025"
	eleventyConfig.addFilter("dataBR", (data) => {
		const d = new Date(data);
		return `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
	});
	eleventyConfig.addFilter("dataISO", (data) => new Date(data).toISOString().slice(0, 10));
	// "2025-07" -> "julho"
	eleventyConfig.addFilter("mes", (anoMes) => MESES[Number(String(anoMes).slice(5, 7)) - 1]);
	// [{data: "2025-07", ...}] -> [{ano: "2025", itens: [...]}], na ordem em que aparecem
	eleventyConfig.addFilter("porAno", (itens, campo = "data") => {
		const grupos = [];
		for (const ev of itens) {
			const ano = String(ev[campo]).slice(0, 4);
			if (grupos.at(-1)?.ano !== ano) grupos.push({ ano, itens: [] });
			grupos.at(-1).itens.push(ev);
		}
		return grupos;
	});
	// líder(es) primeiro, depois os demais em ordem alfabética
	eleventyConfig.addFilter("ordenarEquipe", (membros) => [...membros].sort((a, b) =>
		Number(Boolean(b.lider)) - Number(Boolean(a.lider)) || a.nome.localeCompare(b.nome, "pt-BR")));
	// texto em minúsculas e sem acentos, usado pelo filtro de busca
	eleventyConfig.addFilter("busca", (...partes) => partes.filter(Boolean).join(" ")
		.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());

	eleventyConfig.addCollection("noticias", (api) =>
		api.getFilteredByGlob("src/noticias/*/index.md").sort((a, b) => b.date - a.date));

	// Vídeos do YouTube: troca o <iframe> por uma capa que é um link para o vídeo.
	// Sem JavaScript, o link abre o vídeo no YouTube; com JavaScript (conteudo.js), o vídeo
	// é carregado na própria página só depois do clique. Quem escreve a notícia continua
	// colando o <iframe> normalmente.
	eleventyConfig.addTransform("videos", (conteudo, caminho) => {
		if (!caminho || !caminho.endsWith(".html")) return conteudo;
		return conteudo.replace(/<iframe\b[^>]*\bsrc="https:\/\/www\.youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})[^"]*"[^>]*><\/iframe>/g, (iframe, id) => {
			const titulo = (iframe.match(/\btitle="([^"]*)"/) || [])[1] || "Vídeo do YouTube";
			const generico = titulo === "Vídeo do YouTube";
			return `<a class="video" href="https://www.youtube.com/watch?v=${id}" data-video="${id}" aria-label="Assistir ao vídeo: ${titulo}">`
				+ `<span class="video-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg></span>`
				+ `<span class="video-texto"><strong>${generico ? "Assistir ao vídeo" : titulo}</strong>`
				+ `<span>O vídeo é carregado do YouTube ao clicar.</span></span></a>`;
		});
	});

	return {
		dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
}
