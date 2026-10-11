# Site do CONEA

Site do grupo de pesquisa **CONEA – Conservação da Natureza e Educação Ambiental** (UTFPR Ponta Grossa), publicado em <https://conea.eco.br>.

O site é gerado pelo [Eleventy](https://www.11ty.dev/) a partir de arquivos Markdown e YAML. A cada push na branch `main`, o GitHub Actions monta o site e publica no GitHub Pages (veja a aba **Actions**). Não é preciso mexer em HTML para publicar conteúdo.

## Rodar no computador

Precisa do [Node.js](https://nodejs.org/) 22 ou mais recente.

```sh
npm install   # só na primeira vez
npm start     # abre em http://localhost:8080 e atualiza ao salvar
```

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Notícias | `src/noticias/<nome-da-noticia>/` (uma pasta por notícia) |
| Artigos | `src/_data/artigos.yaml` |
| Produções | `src/_data/producoes.yaml` + imagem em `src/assets/img/producoes/` |
| Equipe | `src/_data/membros.yaml` + foto em `src/assets/img/equipe/` |
| Eventos | `src/_data/eventos.yaml` |
| Menu, redes sociais, e-mail | `src/_data/site.yaml` |
| Página História | `src/historia.md` |
| Página inicial | `src/index.njk` (linhas de pesquisa ficam no topo do arquivo) |
| Visual (cores, fontes) | `src/assets/css/main.css` |

## Publicar uma notícia

1. Crie uma pasta em `src/noticias/` com o nome da notícia em minúsculas, sem acentos e com hífens. Ele vira o endereço: `src/noticias/oficina-de-tintas/` → `conea.eco.br/noticias/oficina-de-tintas/`.
2. Coloque nela a foto de capa com o nome **`capa.webp`**.
3. Crie nela o arquivo **`index.md`**:

```markdown
---
title: Oficina de tintas naturais
date: 2026-04-08
resumo: Crianças da Casa do Piá produziram tintas com urucum, colorau e feijão.
---

Primeiro parágrafo do texto.

Segundo parágrafo, com **negrito**, _itálico_ e um [link](https://exemplo.com).

![Descrição da foto](foto-2.webp)

<iframe class="embed" src="https://www.instagram.com/p/CODIGO/embed" title="Publicação do Instagram" loading="lazy"></iframe>
```

- `date` é a data de publicação (ano-mês-dia). A lista de notícias é ordenada por ela, e a mais recente aparece na página inicial.
- Outras fotos vão na mesma pasta e entram no texto com `![descrição](arquivo.webp)`.
- Para vídeo do YouTube use `class="embed embed-video"` e o endereço `https://www.youtube.com/embed/CODIGO`.
- Crédito da foto de capa (opcional): adicione `legenda: Foto por <a href="...">Fulana</a>` no cabeçalho.

## Incluir artigo, produção, membro ou evento

Edite o arquivo YAML correspondente em `src/_data/`. Cada arquivo tem um comentário no topo e exemplos. Itens novos vão **no topo** da lista (a equipe é ordenada automaticamente: quem tem `lider: true` vem primeiro, os demais por nome). Exemplo de artigo:

```yaml
- titulo: Título do artigo
  autores:
    - SOBRENOME, Nome Completo      # último sobrenome em maiúsculas
    - ANTIQUEIRA, Lia Maris Orth Ritter
  revista: Nome da Revista
  volume: 12
  paginas: 49-63
  ano: 2026
  doi: 10.1234/abcd.5678          # só o código; sem DOI, use link: https://...
```

O site monta a referência no padrão ABNT e agrupa os artigos por ano.

Para vincular um evento a uma notícia, use em `noticia:` o nome da pasta da notícia.
