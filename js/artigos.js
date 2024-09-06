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
naoText.textContent = "Não existe artigos disponíveis.";

async function construirPagina() {
	if (!data)
		await fetch("noticias/artigos.json").then(res => res.json()).then(rdata => { data = rdata });

	notbox.innerHTML = "";
	pagenav.innerHTML = "";
	if (body === naoText.parentElement)
		body.removeChild(naoText);
	
	body.appendChild(notbox);

	const newData = data.filter(item => item[0].toLowerCase().includes(input.value.toLowerCase()));

	if (0 === newData.length) {
		body.appendChild(naoText);
	}

	for (let i = Math.max(0, (pagina-1)*limite);
		i < Math.min((pagina*(limite)), newData.length);
		i++)
	{

		const artigo = document.createElement("a");
		artigo.className = "noticia";
		artigo.style.width = x ? "100%" : "60%";
		if (newData[i][1]) {
			artigo.href = newData[i][1];
			artigo.target = "_blank";
			artigo.rel = "noopener noreferrer";	
		}

		let sep = newData[i][0].split(" . ");
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

		const local = document.createElement("i");
		local.textContent = sep.join(". ");
		textDiv.appendChild(local);

		artigo.appendChild(textDiv);

		notbox.appendChild(artigo);
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
