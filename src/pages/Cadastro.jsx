import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const CAMPOS_INICIAIS = {
  nome: "",
  email: "",
  senha: "",
  cpf: "",
  telefone: "",
  estado: "",
  cep: "",
  complemento: "",
  endereco: "",
  rua: "",
};

export default function Cadastro() {
  const [dados, setDados] = useState(CAMPOS_INICIAIS);
  const { usuario, cadastrar } = useAuth();
  const navigate = useNavigate();

  // Preenche os campos com os dados já salvos, quando existirem (igual ao script.js original).
  useEffect(() => {
    if (usuario) {
      setDados((atual) => ({ ...atual, ...usuario }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setDados((atual) => ({ ...atual, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const dadosUsuario = {
      nome: dados.nome.trim().slice(0, 80),
      email: dados.email.trim().slice(0, 60),
      senha: dados.senha.slice(0, 32),
      cpf: dados.cpf.replace(/\D/g, "").slice(0, 11),
      telefone: dados.telefone.replace(/\D/g, "").slice(0, 11),
      estado: dados.estado.trim().slice(0, 30),
      cep: dados.cep.replace(/\D/g, "").slice(0, 8),
      complemento: dados.complemento.trim().slice(0, 50),
      endereco: dados.endereco.trim().slice(0, 100),
      rua: dados.rua.trim().slice(0, 100),
    };

    cadastrar(dadosUsuario);
    alert("Cadastro realizado e dados salvos no LocalStorage!");
    navigate("/login");
  }

  return (
    <>
      <Navbar />

      <main className="main-container">
        <section className="card-cadastro" aria-labelledby="cadastro-title">
          <h2 id="cadastro-title">Cadastro</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="nome">Nome completo:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                autoComplete="name"
                value={dados.nome}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Endereço de e-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                value={dados.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                name="senha"
                required
                autoComplete="new-password"
                value={dados.senha}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                required
                inputMode="numeric"
                value={dados.cpf}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Número de telefone:</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                required
                autoComplete="tel"
                value={dados.telefone}
                onChange={handleChange}
              />
            </div>

            <div className="form-row row-three">
              <div className="form-group pct-20">
                <label htmlFor="estado">Estado:</label>
                <select id="estado" name="estado" required value={dados.estado} onChange={handleChange}>
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option value="RS">RS</option>
                  <option value="SC">SC</option>
                  <option value="PR">PR</option>
                </select>
              </div>

              <div className="form-group pct-20">
                <label htmlFor="cep">CEP:</label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  required
                  maxLength={8}
                  inputMode="numeric"
                  value={dados.cep}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group pct-60">
                <label htmlFor="complemento">Complemento:</label>
                <input
                  type="text"
                  id="complemento"
                  name="complemento"
                  value={dados.complemento}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row row-two">
              <div className="form-group pct-40">
                <label htmlFor="endereco">Endereço:</label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  required
                  value={dados.endereco}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group pct-60">
                <label htmlFor="rua">Rua:</label>
                <input type="text" id="rua" name="rua" required value={dados.rua} onChange={handleChange} />
              </div>
            </div>

            <div className="center-elements">
              <button type="submit" className="btn-cadastrar">
                Cadastrar-se
              </button>
              <Link to="/login" className="login-link">
                Já possuo uma conta
                <br />
                Clique para acessar
              </Link>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
