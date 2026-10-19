import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Perfil() {
  const { logout, usuario, cadastrar } = useAuth();
  const navigate = useNavigate();
  const [dados, setDados] = useState(usuario || {});
  const [salvo, setSalvo] = useState(false);

  function handleChange(event) {
    setDados((atual) => ({ ...atual, [event.target.name]: event.target.value }));
    setSalvo(false);
  }

  function salvarDados(event) {
    event.preventDefault();
    cadastrar(dados);
    setSalvo(true);
  }

  function fazerLogoutComConfirmacao() {
    const confirmacao = confirm("Tem certeza que deseja fazer logout?");
    if (confirmacao) {
      logout();
      alert("Você foi desconectado com sucesso.");
      navigate("/login");
    }
  }

  return (
    <>
      <Navbar />

      <main className="profile-container">
        <div className="profile-heading">
          <div>
            <span className="eyebrow eyebrow-dark">Área do cliente</span>
            <h1 id="perfil-title">Olá, {usuario?.nome || "cliente"}!</h1>
            <p>Gerencie seus dados e acompanhe sua jornada com a Atual Design.</p>
          </div>
          <button className="btn-logout" onClick={fazerLogoutComConfirmacao}>Sair da conta</button>
        </div>
        <div className="profile-layout">
          <aside className="profile-menu">
            <div className="profile-avatar">{(usuario?.nome || "C").charAt(0).toUpperCase()}</div>
            <strong>{usuario?.nome || "Cliente Atual Design"}</strong>
            <span>{usuario?.email || "Sem e-mail cadastrado"}</span>
            <a className="profile-menu-link active" href="#dados">Dados pessoais</a>
            <a className="profile-menu-link" href="/biblioteca">Projetos salvos</a>
            <a className="profile-menu-link" href="#atendimento">Atendimento</a>
          </aside>
          <section className="profile-card" id="dados">
            <div className="profile-card-heading">
              <div>
                <span className="eyebrow eyebrow-dark">Suas informações</span>
                <h2>Dados pessoais</h2>
              </div>
              {salvo && <span className="save-feedback">Dados salvos</span>}
            </div>
            <form className="profile-form" onSubmit={salvarDados}>
              <div className="form-group"><label htmlFor="perfil-nome">Nome completo</label><input id="perfil-nome" name="nome" value={dados.nome || ""} onChange={handleChange} /></div>
              <div className="form-group"><label htmlFor="perfil-email">E-mail</label><input id="perfil-email" name="email" type="email" value={dados.email || ""} onChange={handleChange} /></div>
              <div className="form-row">
                <div className="form-group"><label htmlFor="perfil-telefone">Telefone</label><input id="perfil-telefone" name="telefone" value={dados.telefone || ""} onChange={handleChange} /></div>
                <div className="form-group"><label htmlFor="perfil-cpf">CPF</label><input id="perfil-cpf" name="cpf" value={dados.cpf || ""} onChange={handleChange} /></div>
              </div>
              <div className="form-group"><label htmlFor="perfil-endereco">Endereço</label><input id="perfil-endereco" name="endereco" value={dados.endereco || ""} onChange={handleChange} /></div>
              <button className="button button-primary profile-save" type="submit">Salvar alterações</button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
