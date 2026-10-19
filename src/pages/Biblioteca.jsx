import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const ambientes = [
  { category: "Cozinha", title: "Cozinha Essencial", price: "R$ 8.490,00", tone: "project-sand", icon: "▦" },
  { category: "Sala", title: "Living Contemporâneo", price: "R$ 6.890,00", tone: "project-clay", icon: "▤" },
  { category: "Dormitório", title: "Suíte Sereno", price: "R$ 9.290,00", tone: "project-olive", icon: "▥" },
  { category: "Home office", title: "Estúdio Foco", price: "R$ 5.790,00", tone: "project-cream", icon: "◇" },
  { category: "Cozinha", title: "Cozinha Terra", price: "R$ 10.490,00", tone: "project-clay-light", icon: "▦" },
  { category: "Sala", title: "Sala Horizonte", price: "R$ 7.290,00", tone: "project-petroleum", icon: "▤" },
];

export default function Biblioteca() {
  return (
    <>
      <Navbar />

      <main className="catalog-container">
        <section className="catalog-header" aria-labelledby="biblioteca-title">
          <div>
            <span className="eyebrow eyebrow-dark">Inspire-se para criar</span>
            <h1 id="biblioteca-title">Biblioteca de designs</h1>
            <p>Explore ambientes planejados e encontre referências para o seu próximo projeto.</p>
          </div>
          <button className="button button-primary" type="button">＋ Salvar inspiração</button>
        </section>

        <div className="catalog-toolbar">
          <div className="catalog-filters" aria-label="Filtrar ambientes">
            <button className="filter-button active" type="button">Todos</button>
            <button className="filter-button" type="button">Cozinhas</button>
            <button className="filter-button" type="button">Salas</button>
            <button className="filter-button" type="button">Dormitórios</button>
            <button className="filter-button" type="button">Home office</button>
          </div>
          <label className="sort-control">
            <span>Ordenar por</span>
            <select defaultValue="relevancia">
              <option value="relevancia">Mais relevantes</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
            </select>
          </label>
        </div>

        <section className="catalog-grid" aria-label="Projetos disponíveis">
          {ambientes.map((ambiente) => (
            <article className="catalog-card" key={ambiente.title}>
              <div className={`project-image ${ambiente.tone}`}>
                <span className="project-tag">{ambiente.category}</span>
                <button className="favorite-button" type="button" aria-label={`Salvar ${ambiente.title}`}>♡</button>
                <span className="project-icon" aria-hidden="true">{ambiente.icon}</span>
              </div>
              <div className="catalog-card-content">
                <span className="catalog-label">Projeto sob medida</span>
                <h2>{ambiente.title}</h2>
                <div className="catalog-card-footer">
                  <div>
                    <small>A partir de</small>
                    <strong>{ambiente.price}</strong>
                  </div>
                  <button className="small-action" type="button">Detalhes</button>
                </div>
                <span className="negotiable">● Valor negociável com especialista</span>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
