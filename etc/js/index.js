const imagem = document.getElementById("slide");
const imTxt = document.getElementById("slideTexto");
const barraProg = document.getElementById("progresso");
const blocoNoticia = document.getElementById("link_noticia");
const imagemNoticia = document.getElementById("imagem_noticia");
const tituloNoticia = document.getElementById("titulo_noticia");
const resumoNoticia = document.getElementById("resumo_noticia");
const tituloArtigo = document.getElementById("titulo_artigo");
const revistaArtigo = document.getElementById("revista_artigo");
const autoresArtigo = document.getElementById("autores_artigo");
const linkArtigo = document.getElementById("link_artigo");

const botaoEsquerdaGrupo = document.getElementById("botao_esquerda_grupo");
const botaoDireitaGrupo = document.getElementById("botao_direita_grupo");

let iProgresso = 1;
let sec = 0;
let arrDescricao = [
	"Visita técnica ao Refúgio das Curucacas.",
	"Visita técnica ao Refúgio das Curucacas.",
	"Visita técnica à Usina Termoelétrica a Biogás - UTB.",
	"Visita à Vila Velha",
	"Grupo CONEA no evento XVIII Encontro Paranaense de Educação Ambiental",
];
var x = window.matchMedia("(max-width: 768px)");

function incremento() {
	imagem.src = `/etc/img/index_slideshow/${iProgresso}.webp`;
	imagem.alt = arrDescricao[iProgresso];
	imTxt.textContent = arrDescricao[iProgresso];
	iProgresso++;
	if (iProgresso >= arrDescricao.length)
		iProgresso = 0;
	imagem.style.borderRight = "0.5rem solid #2E8A56";
}

imagem.onclick = incremento;

imagem.onmousedown = function() {
	imagem.style.borderRight = "0rem";
};

imagem.onmouseenter = function() {
	barraProg.style.height = "0.1px";
	imagem.style.borderRight = "0.5rem solid #2E8A56";
};

function mostrarBarProgEsconderBorda() {
	barraProg.style.height = "10px";
	imagem.style.borderRight = "0rem";
};

imagem.onmouseleave = mostrarBarProgEsconderBorda;

window.setInterval(function() {
	if (!imagem.matches(":hover"))
	{
		if (0 === sec)
		{
			barraProg.style.borderTopRightRadius = 
				barraProg.style.borderTopLeftRadius = `0rem`;
			incremento();
		}

		mostrarBarProgEsconderBorda();
		sec++;
		barraProg.style.width = x.matches ? `${80 * sec / 5}%` : `${700 * sec / 5}px`;
		if (5 === sec)
		{
			barraProg.style.borderRadius = `1rem`;
			sec = 0;
		}
	}
}, 1000);

fetch("/noticias/noticias.json").then(res => res.json()).then(data => {
	blocoNoticia.href = `/noticias/${data.noticias[0].titulo}.html`;
	blocoNoticia.target = "_blank";
	blocoNoticia.rel = "noopener noreferrer";
	blocoNoticia.className = "noticia";
	tituloNoticia.textContent = data.noticias[0].titulo;
	resumoNoticia.textContent = data.noticias[0].resumo;
	imagemNoticia.src = `/noticias/${data.noticias[0].titulo}.webp`; 
	imagemNoticia.alt = data.noticias[0].resumo;
});

fetch("/etc/artigos.json").then(res => res.json()).then(data => {
	let sep = data[0][0].split(" . ");
	let textAutores = sep[0];
	sep = sep[1].split(". ");

	tituloArtigo.textContent = sep.shift();
	autoresArtigo.textContent = textAutores;
	revistaArtigo.textContent = sep.join(". ");
	if (data[0][1]) {
		linkArtigo.href = data[0][1];
		linkArtigo.target = "_blank";
		linkArtigo.rel = "noopener noreferrer";	
	} else {
		linkArtigo.textContent = "Confira outros artigos clicando aqui!";
		linkArtigo.href = "/artigos.html";
	}
});

let dataGrupo, indexGrupo = 0;

botaoDireitaGrupo.onclick = function() { indexGrupo++; setarMembrosGrupo(); }
botaoEsquerdaGrupo.onclick = function() { indexGrupo--; setarMembrosGrupo(); }

function setarMembrosGrupo() {
	if (!dataGrupo)
		return;

	if (indexGrupo < 0 || indexGrupo > Math.ceil(dataGrupo.length/3)-1) indexGrupo = 0;

	let nomeGrupo, imagemGrupo, textoGrupo, linkGrupo;

	for (let i = 0; i < 3; i++)
	{
		let sep = dataGrupo[(indexGrupo*3)+i];
		nomeGrupo = document.getElementById(`nome_grupo${i}`);
		imagemGrupo = document.getElementById(`imagem_grupo${i}`);
		textoGrupo = document.getElementById(`texto_grupo${i}`);
		linkGrupo = document.getElementById(`link_grupo${i}`);
		orcidGrupo = document.getElementById(`link1_grupo${i}`);
		
		if (!sep){
			nomeGrupo.textContent = "Pepe";
			imagemGrupo.src = `/etc/img/index_membros/pepe${i}.webp`;
			textoGrupo.textContent = "Profissional em Jacu";
			linkGrupo.href = "";
			orcidGrupo.href = "";
			break;
		}

		nomeGrupo.textContent = sep[0];
		imagemGrupo.src = sep[1] != "" ? `/etc/img/index_membros/${sep[1]}.webp` : "/etc/img/index_membros/fallback.webp";
		textoGrupo.textContent = sep[2];
		linkGrupo.href = sep[3];
		orcidGrupo.href = sep[4];
	}
}

fetch("/etc/membros.json").then(res => res.json()).then(data => { dataGrupo = data.sort(); setarMembrosGrupo(); });
