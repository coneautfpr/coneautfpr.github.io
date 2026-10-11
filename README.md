# Site do CONEA

Repositório do site do grupo de pesquisa **CONEA – Conservação da Natureza e Educação Ambiental**, da Universidade Tecnológica Federal do Paraná (UTFPR), campus Ponta Grossa. O site está disponível em <https://conea.eco.br>.

O site é gerado com o [Eleventy](https://www.11ty.dev/) a partir de arquivos em Markdown e YAML, de modo que a publicação de conteúdo não exige edição de HTML. A cada envio (*push*) para a branch `main`, o GitHub Actions gera o site e o publica no GitHub Pages; o andamento pode ser acompanhado na aba **Actions**.

## Requisitos

- [Node.js](https://nodejs.org/) versão 22 ou superior.

## Execução local

```sh
npm install   # instala as dependências (necessário apenas na primeira execução)
npm start     # inicia o servidor em http://localhost:8080
```

O servidor local atualiza o site automaticamente sempre que um arquivo é salvo.

## Estrutura do projeto

| Conteúdo | Localização |
|---|---|
| Notícias | `src/noticias/<identificador>/`, uma pasta por notícia |
| Artigos | `src/_data/artigos.yaml` |
| Produções | `src/_data/producoes.yaml`; imagens em `src/assets/img/producoes/` |
| Equipe | `src/_data/membros.yaml`; fotos em `src/assets/img/equipe/` |
| Eventos | `src/_data/eventos.yaml` |
| Menu, redes sociais e e-mail | `src/_data/site.yaml` |
| Página História | `src/historia.md` |
| Página inicial | `src/index.njk` (as linhas de pesquisa são definidas no início do arquivo) |
| Estilos (cores e tipografia) | `src/assets/css/main.css` |

## Publicação de notícias

1. Crie uma pasta em `src/noticias/` cujo nome será o identificador da notícia, em letras minúsculas, sem acentos e com palavras separadas por hífens. O nome da pasta define o endereço da página: `src/noticias/oficina-de-tintas/` corresponde a `conea.eco.br/noticias/oficina-de-tintas/`.
2. Inclua na pasta a imagem de capa, com o nome `capa.webp`.
3. Crie na pasta o arquivo `index.md`, conforme o modelo:

```markdown
---
title: Oficina de tintas naturais
date: 2026-04-08
resumo: Crianças da Casa do Piá produziram tintas com urucum, colorau e feijão.
---

Primeiro parágrafo do texto.

Segundo parágrafo, com **negrito**, _itálico_ e um [link](https://exemplo.com).

![Descrição da imagem](foto-2.webp)
```

Observações:

- O campo `date` indica a data de publicação, no formato ano-mês-dia. As notícias são ordenadas por essa data, e a mais recente é exibida na página inicial.
- Imagens adicionais devem ser incluídas na mesma pasta e referenciadas no texto com `![descrição](arquivo.webp)`.
- Vídeos do YouTube podem ser incorporados com `<iframe class="embed embed-video" src="https://www.youtube.com/embed/CODIGO" title="Título do vídeo" loading="lazy"></iframe>`.
- O crédito da imagem de capa é opcional e pode ser informado no cabeçalho: `legenda: Foto por <a href="...">Nome</a>`.

## Atualização de artigos, produções, equipe e eventos

Esses conteúdos são mantidos nos arquivos YAML da pasta `src/_data/`. Cada arquivo traz, no início, a descrição dos campos aceitos. Novos itens devem ser inseridos no início da lista. A equipe é ordenada automaticamente: integrantes marcados com `lider: true` aparecem primeiro, e os demais em ordem alfabética.

Modelo de artigo:

```yaml
- titulo: Título do artigo
  autores:
    - SOBRENOME, Nome Completo      # último sobrenome em maiúsculas
    - SILVA, Maria Aparecida
  revista: Nome da Revista
  volume: 12
  paginas: 49-63
  ano: 2026
  doi: 10.1234/abcd.5678          # apenas o código; na ausência de DOI, use link: https://...
```

A referência de cada artigo é montada automaticamente no padrão ABNT, e a página de artigos os agrupa por ano.

Para associar um evento a uma notícia, informe no campo `noticia:` o identificador (nome da pasta) da notícia correspondente.

## Publicação

A publicação é automática: o fluxo `.github/workflows/deploy.yml` é executado a cada envio para a branch `main`. Para publicar novamente sem alterações, utilize a opção **Run workflow** do fluxo "Publicar site", na aba **Actions**.
