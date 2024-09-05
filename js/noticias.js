var x = window.matchMedia("(max-width: 768px)");
fetch("noticias/order.json").then(res => res.json())
	.then(data => {
	const body = document.getElementById("body");
	const notbox = document.createElement("div");
	notbox.className = "notbox";
	data.noticias.forEach(item => {	
		const noticia = document.createElement("a");
		noticia.href = `noticias/${item.titulo}.html`;
		noticia.className = "noticia";

		const imagem = document.createElement("img");
		imagem.src = `noticias/${item.titulo}.webp`;
		noticia.appendChild(imagem);

		const textDiv = document.createElement("div");
		textDiv.className = "text";

		const texto = document.createElement("b");
		texto.textContent = item.titulo;
		textDiv.appendChild(texto);
		
		const data = document.createElement("div");
		data.textContent = item.data;
		textDiv.appendChild(data);

		if (!x.matches)
		{
			const resumo = document.createElement("div");
			resumo.textContent = item.resumo;
			textDiv.appendChild(resumo);
		}

		noticia.appendChild(textDiv);

		notbox.appendChild(noticia);
	});
	body.appendChild(notbox);
});


