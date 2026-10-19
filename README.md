# Atual Design — versão React

Trabalho de Conclusão de Curso (TCC) do IFC Campus Sombrio, de Luiz Gabriel da Silva Santos e Miguel Amorim Ribeiro.

Esta é a versão migrada do projeto original (HTML + CSS + JS puro) para **React + CSS**, usando **Vite** como build tool e **React Router** para as rotas.

## Como rodar

```bash
npm install
npm run dev
```

Depois acesse o endereço mostrado no terminal (normalmente `http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

Para executar a versão de produção com o servidor local Express:

```bash
npm run build
npm start
```

O servidor ficará disponível em `http://localhost:3000`. Para usar outra porta,
defina a variável de ambiente `PORT` antes de iniciar.

## Estrutura do projeto

```
src/
  assets/            # imagens (logo)
  components/
    Navbar.jsx        # cabeçalho com navegação (usado em todas as páginas)
    Footer.jsx         # rodapé (usado em todas as páginas)
    ProtectedRoute.jsx # bloqueia acesso a páginas internas se o usuário não estiver logado
  context/
    AuthContext.jsx    # lógica de cadastro/login/logout, usando localStorage
  pages/
    Cadastro.jsx        # antigo cadastro.html + script.js
    Login.jsx            # antigo login.html + login.js
    Home.jsx              # antigo home.html
    Perfil.jsx             # antigo perfil.html (com botão de logout)
    Biblioteca.jsx          # antigo biblioteca.html
  App.jsx                    # define as rotas da aplicação
  main.jsx                    # ponto de entrada da aplicação
  index.css                     # todo o CSS do projeto original (mesmas variáveis e classes)
```

## O que mudou em relação ao projeto original

- As páginas HTML (`cadastro.html`, `login.html`, `home.html`, `perfil.html`, `biblioteca.html`) viraram componentes React em `src/pages`.
- O `auth.js`, `login.js` e `script.js` (JS puro manipulando o DOM) viraram um `AuthContext` (React Context + hooks), mantendo a **mesma lógica**: os dados de cadastro continuam salvos em `localStorage` sob a chave `usuarioCadastro`, e o login continua validando e-mail/CPF/telefone + senha.
- O roteamento por servidor Node (`server/server.js`, que mapeava `/login`, `/cadastro`, `/home`, etc. para arquivos `.html`) foi substituído pelo **React Router**, que faz esse mapeamento no lado do cliente.
- O CSS (`style.css`) foi movido para `src/index.css` **sem nenhuma alteração de estilo** — mesmas cores, variáveis, layout e breakpoint responsivo.
- Foi adicionado um `ProtectedRoute`, que reproduz a checagem que o `auth.js` fazia (redireciona para `/login` se não houver usuário logado) para as rotas `/home`, `/perfil` e `/biblioteca`.

## Observação importante

Assim como no projeto original, este é um protótipo/demonstração: o "cadastro" e "login" são simulados no navegador via `localStorage`, sem um back-end real de autenticação. Para um sistema em produção, seria necessário um servidor com banco de dados e autenticação segura (hash de senha, tokens, etc.).
