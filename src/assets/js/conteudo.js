// Recursos das páginas de notícia (e da História). Sem JavaScript, tudo continua funcionando:
// o botão de compartilhar fica oculto, as fotos aparecem normalmente e os vídeos são links para o YouTube.

// ---------- Compartilhar ----------
const caixaCompartilhar = document.querySelector("[data-compartilhar]");
if (caixaCompartilhar) {
	const botao = caixaCompartilhar.querySelector("button");
	const aviso = caixaCompartilhar.querySelector("[data-compartilhar-aviso]");
	const dados = {
		title: document.querySelector("h1")?.textContent.trim() || document.title,
		text: document.querySelector(".resumo")?.textContent.trim() || "",
		url: location.href.split("#")[0],
	};
	let timer;
	const avisar = (texto) => {
		aviso.textContent = texto;
		clearTimeout(timer);
		timer = setTimeout(() => { aviso.textContent = ""; }, 3000);
	};
	caixaCompartilhar.hidden = false;
	botao.addEventListener("click", async () => {
		// celular e tablet: menu de compartilhar do próprio aparelho
		// (no computador, Windows e macOS também têm esse menu, mas copiar o link é mais direto)
		const toque = matchMedia("(pointer: coarse)").matches;
		if (navigator.share && toque) {
			try { await navigator.share(dados); } catch { /* compartilhamento cancelado */ }
			return;
		}
		// computador: copia o link
		try {
			await navigator.clipboard.writeText(dados.url);
			avisar("Link copiado");
		} catch {
			avisar("Não foi possível copiar. Copie o endereço da barra do navegador.");
		}
	});
}

// ---------- Ampliar fotos ----------
const fotos = document.querySelectorAll(".noticia .capa img, .noticia .texto img");
if (fotos.length) {
	const janela = document.createElement("dialog");
	janela.className = "ampliada";
	janela.setAttribute("aria-label", "Imagem ampliada");
	janela.innerHTML = `
		<img alt="">
		<button type="button" class="ampliada-fechar" aria-label="Fechar imagem ampliada">
			<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
		</button>`;
	document.body.append(janela);
	const grande = janela.querySelector("img");
	janela.querySelector("button").addEventListener("click", () => janela.close());
	// clicar fora da imagem (no fundo escurecido) fecha; Esc fecha pelo próprio <dialog>
	janela.addEventListener("click", (e) => { if (e.target === janela) janela.close(); });

	for (const foto of fotos) {
		const botao = document.createElement("button");
		botao.type = "button";
		botao.className = "ampliar";
		botao.setAttribute("aria-label", foto.alt ? `Ampliar imagem: ${foto.alt}` : "Ampliar imagem");
		foto.replaceWith(botao);
		botao.append(foto);
		botao.addEventListener("click", () => {
			grande.src = foto.currentSrc || foto.src;
			grande.alt = foto.alt;
			janela.showModal();
		});
	}
}

// ---------- Vídeos carregados só ao clicar ----------
// O HTML já vem com a capa (gerada no build): um link para o vídeo no YouTube.
for (const capa of document.querySelectorAll("a.video[data-video]")) {
	capa.addEventListener("click", (e) => {
		e.preventDefault();
		const iframe = document.createElement("iframe");
		iframe.className = "embed";
		iframe.src = `https://www.youtube-nocookie.com/embed/${capa.dataset.video}?autoplay=1`;
		iframe.title = capa.getAttribute("aria-label").replace(/^Assistir ao vídeo: /, "");
		iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
		iframe.allowFullscreen = true;
		capa.replaceWith(iframe);
		iframe.focus();
	});
}
