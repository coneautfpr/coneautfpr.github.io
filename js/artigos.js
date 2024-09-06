var x = window.matchMedia("(max-width: 768px)").matches;
fetch("noticias/artigos.json").then(res => res.json())
	.then(data => {
		const body = document.getElementById("body");
		const notbox = document.createElement("div");
		notbox.className = "notbox";
		data.forEach(item => {
			const artigo = document.createElement("a");
			artigo.className = "noticia";
			artigo.style.width = x ? "100%" : "60%";
			if (item[1]) {
				artigo.href = item[1];
				
			}

			let sep = item[0].split(" . ");
			let textAutores = sep[0];
			sep = sep[1].split(". ");

			const textDiv = document.createElement("div");
			textDiv.className = "text";

			const texto = document.createElement("b");
			texto.textContent = sep.shift();
			textDiv.appendChild(texto);

			const autores = document.createElement("div");
			autores.textContent = textAutores;
			textDiv.appendChild(autores);

			//textDiv.appendChild(document.createElement("hr"));

			const local = document.createElement("i");
			local.textContent = sep.join(". ");
			textDiv.appendChild(local);

			artigo.appendChild(textDiv);

			notbox.appendChild(artigo);
		});
		body.innerHTML = "";
		body.appendChild(notbox);
	});


