import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const resultado = login(identificador.trim(), senha);

    if (resultado.sucesso) {
      alert(`Bem-vindo de volta, ${resultado.nome}!`);
      navigate("/home");
    } else {
      alert(resultado.mensagem);
    }
  }

  return (
    <>
      <Navbar />

      <main className="main-container">
        <section className="card-cadastro" aria-labelledby="login-title">
          <h2 id="login-title">Página de login</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="loginIdentificador">Endereço de e-mail, CPF ou telefone:</label>
              <input
                type="text"
                id="loginIdentificador"
                name="loginIdentificador"
                required
                autoComplete="username"
                value={identificador}
                onChange={(event) => setIdentificador(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="loginSenha">Senha:</label>
              <input
                type="password"
                id="loginSenha"
                name="loginSenha"
                required
                autoComplete="current-password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>

            <div className="center-elements">
              <button type="submit" className="btn-cadastrar">
                Login
              </button>
              <Link to="/cadastro" className="login-link">
                Não possuo uma conta
                <br />
                Cadastre-se aqui
              </Link>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
