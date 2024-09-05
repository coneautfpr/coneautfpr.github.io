# Como publicar uma notícia

- Editar arquivo JSON com as informações da notícia a ser colocada, sempre colocar por primeiro depois de `noticias: [`, ao fechar as chaves, colocar vírgula no final:
```json
    	{
			"titulo":"TITULO COMPLETO",
			"data": "31/12/2024",
			"resumo": "RESUMO"
		},
```

- Fazer upload de uma imagem com o nome da notícia em formato WEBP, e um arquivo HTML com o mesmo nome, editando as informações após `<!--- body --->`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>CONEA marca presença no Pré-SICITE e Pré-SEI</title>
		<link rel="icon" type="image/x-icon" href="../img/conea.png">
		<link rel="stylesheet" href="../css.css">
		<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
	</head>
	<body>
		<div class="logoCon">
			<img class="logo" src="../img/conea_deitado.png">
		</div>
		<div class="nav">
			<a href="../index.html"><i class="bx bx-home"></i> Início</a>
			<a class="active" href="../noticias.html"><i class="bx bx-news"></i> Notícias</a>
			<a href="../contato.html"><i class="bx bx-envelope"></i> Contato</a>
			<a href="../artigos.html"><i class="bx bx-library"></i> Artigos</a>
			<a href="../historia.html"><i class="bx bxs-tree"></i> História</a>
			<a href="https://www.instagram.com/conea.utfprpg/" target="_blank" rel="noopener noreferrer"><i class="bx bxl-instagram"></i></a>
			<a href="" target="_blank" rel="noopener noreferrer"><i class="bx bxl-facebook"></i></a>
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
