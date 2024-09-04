let imagem = document.getElementById("slide");
let imTxt = document.getElementById("slideTexto");
let barraProg = document.getElementById("progresso");
let iProgresso = 1;
let sec = 0;
let arrDescricao = [
	"Visita técnica ao Refúgio das Curucacas.",
	"Visita técnica ao Refúgio das Curucacas.",
	"Visita técnica à Usina Termoelétrica a Biogás - UTB.",
];
var x = window.matchMedia("(max-width: 768px)");

function incremento() {
	imagem.src = `img/${iProgresso}.webp`;
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
