function ativarAcessibilidade() {
	if (sessionStorage.getItem("acessibilidade") == 0) {
		sessionStorage.setItem("acessibilidade", 1);
		setarAcessibilidade();
	}
	else {
		sessionStorage.setItem("acessibilidade", 0);
		location.reload();
	}
}

function setarAcessibilidade() {
	if (sessionStorage.getItem("acessibilidade") == 0 ||
		!sessionStorage.getItem("acessibilidade"))
		return;

	const botaoAcessibilidade = document.getElementById("acessibilidade");

	const todoElemento = document.querySelectorAll("*");
	const bodyAcessibilidade = document.getElementsByClassName("body")[0];
	const nav = document.getElementsByClassName("nav")[0];
	const navButton = document.querySelectorAll(".nav a");
	const logoCon = document.getElementsByClassName("logo")[0];

	botaoAcessibilidade.className = "active";

	for (let i = 0; i < todoElemento.length; i++)
	{
		todoElemento[i].style.boxShadow = "none";
		todoElemento[i].style.textShadow = "none";
		todoElemento[i].style.borderRadius = "0px";
		todoElemento[i].style.transition = "none";
		todoElemento[i].style.animation = "none";
		if (todoElemento[i].tagName != "A") 
			todoElemento[i].style.color = "#000000";
		if (todoElemento[i].className === "body" ||
			todoElemento[i].className === "noticia")
			todoElemento[i].style.backgroundColor = "#FFFFFF";
		if (todoElemento[i].tagName === "IMG")
			todoElemento[i].style.border = "2px #000000 solid";
		if (todoElemento[i].tagName === "A" && todoElemento[i].href.length)
			todoElemento[i].style.border = "2px #0000FF solid";
	}

	navButton.forEach(navButtonItem => {
		navButtonItem.style.padding = "16px 16px";
		navButtonItem.style.border = "2px solid #000000";
		navButtonItem.style.color = "#000000";
		navButtonItem.style.backgroundColor = "#FFFFFF";
	});

	logoCon.style.backgroundColor = "#FFFFFF";
	bodyAcessibilidade.style.backgroundColor = "#FFFFFF";
	bodyAcessibilidade.style.color = "#000000";
}

document.addEventListener("DOMContentLoaded", function(event){
	setarAcessibilidade();
});

