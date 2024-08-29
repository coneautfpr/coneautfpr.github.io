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
}

imagem.onclick = function() {
	incremento();	
};

window.setInterval(function() {
	if (!imagem.matches(":hover"))
	{
		if (0 === sec)
			incremento();

		barraProg.style.height = "10px";
		barraProg.style.border = "1px solid #1D2021"
		sec++;
		barraProg.style.width = x.matches ? `${80 * sec / 5}%` : `${700 * sec / 5}px`;
		if (5 === sec)
			sec = 0;
	}
	else 
	{
		barraProg.style.height = "0.5px";
		barraProg.style.border = "0px";
	}
}, 1000);
