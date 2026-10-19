# Diretrizes do projeto Atual Design

## Visão geral

Aplicação React para a Atual Design, uma empresa de móveis sob medida. A interface combina uma vitrine de e-commerce com uma área de autenticação e perfil do cliente.

## Identidade visual

- Use petróleo como cor estrutural (`#1A3332` e variações).
- Use bege/off-white (`#F4EBE1` e `#FBF8F3`) para superfícies e áreas de respiro.
- Use terracota (`#D97854` e `#B65D41`) somente para CTAs, estados ativos e destaques.
- Preserve alto contraste, foco visível e responsividade em desktop e mobile.
- A fonte `Playfair Display` é usada em títulos editoriais; `DM Sans` é usada em textos, formulários e navegação.
- O sistema visual compartilhado está em [src/index.css](./src/index.css).

## Arquitetura

- `src/main.jsx` inicializa o React e importa o CSS global.
- `src/App.jsx` define as rotas e o `AuthProvider`.
- `src/components/` contém `Navbar`, `Footer` e componentes de proteção de rota.
- `src/pages/` contém as telas de Cadastro, Login, Home, Biblioteca e Perfil.
- `src/context/AuthContext.jsx` mantém autenticação de demonstração no `localStorage`.
- `src/assets/` contém imagens e recursos visuais da marca.

## Padrões de interface

- Reutilize as classes e variáveis existentes em `src/index.css` antes de criar estilos paralelos.
- Páginas autenticadas devem manter `Navbar` e `Footer`.
- A Home e a Biblioteca devem usar cards de projeto, preço indicativo e indicação explícita de negociação.
- Ações principais devem usar `.button button-primary`; links secundários devem manter contraste e foco visível.
- Use grids responsivos e evite dimensões fixas que causem rolagem horizontal em telas menores.
- Todo campo de formulário deve possuir `label`, `id` correspondente e `autoComplete` quando aplicável.
- Elementos somente visuais devem usar `aria-hidden="true"`; ações devem possuir rótulos acessíveis.

## Dados e segurança

O cadastro e o login são protótipos locais e usam `localStorage`. Não adicionar senhas reais, chaves ou dados sensíveis ao repositório. Uma futura versão de produção deverá substituir esse fluxo por autenticação no servidor, hash de senha e banco de dados.

## Build e validação

```bash
npm install
npm run dev
npm run build
npm start
```

`npm start` serve a pasta `dist` por meio de [app.js](./app.js) e exige que `npm run build` tenha sido executado antes.

## Convenções de implementação

- Use componentes funcionais e hooks do React.
- Preserve a extensão `.jsx` nos componentes React.
- Use imports relativos seguindo o padrão atual.
- Faça mudanças cirúrgicas e valide com `npm run build`.
- Não introduza Tailwind ou outra biblioteca visual sem atualizar as dependências e justificar a necessidade.
