# Como publicar uma notícia

- Editar arquivo JSON com as informações da notícia a ser colocada, sempre colocar por primeiro depois de `noticias: [`, ao fechar as chaves, colocar vírgula no final:
```json
    	{
			"titulo":"TITULO COMPLETO",
			"data": "31/12/2024",
			"resumo": "RESUMO"
		},
```

- Fazer upload de uma imagem com o nome da notícia em formato WEBP, e um arquivo HTML com o mesmo nome, editando as informações após `<!--- body --->`, não se esqueça de trocar o titulo da página na parte `<head>`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>CONEA - TITULO COMPLETO</title>
		<link rel="icon" type="image/x-icon" href="/etc/img/conea.png">
		<link rel="stylesheet" href="/etc/css.css">
		<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <script type="text/javascript" src="/etc/js/acessibilidade.js"></script>
	</head>
	<body>
		<div class="logoCon">
			<img class="logo" src="/etc/img/conea_deitado.png">
		</div>
		<div class="nav">
			<a href="/index.html"><i class="bx bx-home"></i> <b>Início</b></a>
			<a class="active" href="/noticias.html"><i class="bx bx-news"></i> <b>Notícias</b></a>
			<a href="/contato.html"><i class="bx bx-envelope"></i> <b>Contato</b></a>
			<a href="/artigos.html"><i class="bx bx-library"></i> <b>Artigos</b></a>
			<a href="/historia.html"><i class="bx bxs-tree"></i> <b>História</b></a>
			<a href="/producoes.html"><i class="bx bxs-download"></i> <b>Produções</b></a>
			<a class="social" href="https://www.instagram.com/conea.utfprpg/" aria-label="Instagram" alt="Página do Instagram do CONEA" target="_blank" rel="noopener noreferrer"><i class="bx bxl-instagram"></i></a>
			<a class="social" href="https://www.facebook.com/coneautfprpg" aria-label="Facebook" alt="Página do Facebook do CONEA" target="_blank" rel="noopener noreferrer"><i class="bx bxl-facebook"></i></a>
			<!--<a id="dark-mode" aria-label="Ativar modo escuro." alt="Ativar modo escuro." onclick="ativarAcessibilidade()"><i class='bx bx-moon'></i></a>-->
			<a id="acessibilidade" aria-label="Desativar Animações e ativar alto contraste." alt="Desativar animações e ativar alto contraste" onclick="ativarAcessibilidade()"><i class='bx bx-low-vision'></i></a>
		</div> 
		<!--- body --->
		<div class="body" id="body">
			<h1>TITULO COMPLETO</h1>
			<p>Postado em 31/12/2024.</p>
			<img src="TITULO COMPLETO.webp"></img>
			<small>Resumo do texto vai aqui.</small>
			<p>Separar cada parágrafo assim, começando e terminando com as tags P</p>
		</div>
		<!--- end of body --->
		<div class="footer">
			<footer>©  2024 CONEA</footer>
		</div>
	</body>
</html>
```

No futuro simplificar esse processo.

# Como incluir um artigo.
- Editar o arquivo `artigos.json`, colocando o novo artigo em cima do anterior, caso não exista link para a postagem, apenas inclua o primeiro texto, como mostrado no segundo exemplo:
```json
[
	[ "SOBRENOME, Nome . TITULO. LOCAL, 2024. ", "http://dx.doi.org/.../" ],
	[ "SOBRENOME, Nome . TITULO. LOCAL, 2024. " ],
    ...
]
```
