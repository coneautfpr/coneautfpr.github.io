var x = window.matchMedia("(max-width: 768px)").matches;
const body = document.getElementById("body");
const textoCarregando = document.getElementsByClassName("carregando")[0];
const input = document.getElementsByTagName("input")[0];
const naoText = document.createElement("h1");
const notbox = document.createElement("div");
const pagenav = document.createElement("div");

let pagina = 1;
let limite = 5;
let data;

notbox.className = "notbox";
pagenav.className = "page";
naoText.textContent = "Não existe notícias disponíveis.";

async function construirPagina() {
	if (!data)
		await fetch("noticias/noticias.json").then(res => res.json()).then(rdata => { data = rdata });

	notbox.innerHTML = "";
	pagenav.innerHTML = "";
	if (body === naoText.parentElement)
		body.removeChild(naoText);

	body.appendChild(notbox);

	const newData = data.noticias.filter(item => item.titulo.toLowerCase().includes(input.value.toLowerCase()));

	if (0 === newData.length) {
		body.appendChild(naoText);
	}

	for (let i = Math.max(0, (pagina-1)*limite);
		 i < Math.min((pagina*(limite)), newData.length);
	i++)
		 {
			 const noticia = document.createElement("a");
			 noticia.href = `noticias/${newData[i].titulo}.html`;
			 noticia.target = "_blank";
			 noticia.rel = "noopener noreferrer";
			 noticia.className = "noticia";

			 const imagem = document.createElement("img");
			 imagem.src = `noticias/${newData[i].titulo}.webp`;
			 noticia.appendChild(imagem);

			 const textDiv = document.createElement("div");
			 textDiv.className = "text";

			 const texto = document.createElement("b");
			 texto.textContent = newData[i].titulo;
			 textDiv.appendChild(texto);

			 const data = document.createElement("div");
			 data.textContent = newData[i].data;
			 textDiv.appendChild(data);

			 if (!x)
			 {
				 const resumo = document.createElement("div");
				 resumo.textContent = newData[i].resumo;
				 textDiv.appendChild(resumo);
			 }

			 noticia.appendChild(textDiv);

			 notbox.appendChild(noticia);
		 }

		 for (let i = 0; i < (Math.ceil(newData.length/limite)); i++)
		 {
			 const numeroPagina = document.createElement("a");
			 numeroPagina.id = `pagina${i+1}`;
			 numeroPagina.textContent = `${i+1}`;
			 if ((i+1) === pagina)
				 numeroPagina.className = "active";
			 numeroPagina.onclick = function () {
				 pagina = i+1;
				 construirPagina();

			 };
			 pagenav.appendChild(numeroPagina);
		 }
		 body.appendChild(pagenav);

		 textoCarregando.style.fontSize = "0px";
		 textoCarregando.style.margin = "0px";
		 input.disabled = 0;

}

input.oninput = function () {
	construirPagina();
}

construirPagina();
