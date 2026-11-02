import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <Navbar />

      <main className="admin-container">
        <section className="admin-header" aria-labelledby="admin-title">
          <div>
            <span className="eyebrow eyebrow-dark">Área restrita</span>
            <h1 id="admin-title">Painel de administração</h1>
            <p>Organize conteúdos e acompanhe a operação da Atual Design em um só lugar.</p>
          </div>
          <span className="admin-access-note">Acesso temporário para usuários logados</span>
        </section>

        <section className="admin-grid" aria-label="Recursos administrativos">
          <article className="admin-card">
            <span className="admin-card-icon" aria-hidden="true">▦</span>
            <div>
              <h2>Projetos e conteúdos</h2>
              <p>Gerencie os projetos exibidos na biblioteca e na página inicial.</p>
            </div>
            <Link className="small-action" to="/admin/estoque">Acessar</Link>
          </article>
          <article className="admin-card">
            <span className="admin-card-icon" aria-hidden="true">◯</span>
            <div>
              <h2>Usuários</h2>
              <p>Consulte os clientes cadastrados e acompanhe os acessos.</p>
            </div>
            <button className="small-action" type="button">Em breve</button>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}
