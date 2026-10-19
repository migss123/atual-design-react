import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const categorias = [
  { icon: "▦", title: "Cozinhas", text: "Funcionalidade para sua rotina" },
  { icon: "▤", title: "Dormitórios", text: "Conforto em cada detalhe" },
  { icon: "▥", title: "Salas", text: "Ambientes para viver melhor" },
  { icon: "◇", title: "Home office", text: "Produtividade com estilo" },
];

const projetos = [
  {
    tag: "Mais escolhido",
    title: "Cozinha Essencial",
    description: "Linhas limpas, materiais resistentes e espaço pensado para você.",
    price: "A partir de R$ 8.490,00",
    tone: "project-sand",
    icon: "▦",
  },
  {
    tag: "Novo projeto",
    title: "Living Contemporâneo",
    description: "Um living elegante que combina acolhimento e personalidade.",
    price: "A partir de R$ 6.890,00",
    tone: "project-clay",
    icon: "▤",
  },
  {
    tag: "Exclusivo",
    title: "Suíte Sereno",
    description: "Armários sob medida para transformar descanso em experiência.",
    price: "A partir de R$ 9.290,00",
    tone: "project-olive",
    icon: "▥",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="home-container">
        <section className="hero-banner" aria-labelledby="home-title">
          <div className="hero-content">
            <span className="eyebrow">Coleção 2026 · ambientes que inspiram</span>
            <h1 id="home-title">Seu espaço, do seu jeito.</h1>
            <p>
              Projetamos móveis sob medida para transformar sua casa em um lugar ainda mais seu, com beleza,
              qualidade e acompanhamento em cada etapa.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">
                Explorar projetos
              </a>
              <a className="button button-outline" href="#orcamento">
                Falar com um especialista
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="hero-art-label">feito para<br />viver bem</span>
            <div className="hero-shelf hero-shelf-one" />
            <div className="hero-shelf hero-shelf-two" />
            <div className="hero-chair" />
          </div>
        </section>

        <section className="section-block" aria-labelledby="categories-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow eyebrow-dark">Encontre inspiração</span>
              <h2 id="categories-title">Qual ambiente você quer transformar?</h2>
            </div>
            <a className="text-link" href="#projetos">Ver todos os ambientes →</a>
          </div>
          <div className="category-grid">
            {categorias.map((categoria) => (
              <a className="category-card" href="#projetos" key={categoria.title}>
                <span className="category-icon" aria-hidden="true">{categoria.icon}</span>
                <span>
                  <strong>{categoria.title}</strong>
                  <small>{categoria.text}</small>
                </span>
                <span className="category-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section-block" id="projetos" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow eyebrow-dark">Curadoria Atual Design</span>
              <h2 id="projects-title">Projetos em destaque</h2>
            </div>
            <a className="text-link" href="/biblioteca">Conheça nossa biblioteca →</a>
          </div>
          <div className="project-grid">
            {projetos.map((projeto) => (
              <article className="project-card" key={projeto.title}>
                <div className={`project-image ${projeto.tone}`}>
                  <span className="project-icon" aria-hidden="true">{projeto.icon}</span>
                  <span className="project-tag">{projeto.tag}</span>
                  <button className="favorite-button" type="button" aria-label={`Salvar ${projeto.title}`}>
                    ♡
                  </button>
                </div>
                <div className="project-content">
                  <h3>{projeto.title}</h3>
                  <p>{projeto.description}</p>
                  <strong className="project-price">{projeto.price}</strong>
                  <div className="project-footer">
                    <span className="negotiable">● Negociável</span>
                    <a href="/biblioteca" className="project-link">Ver detalhes</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="consulting-banner" id="orcamento" aria-labelledby="consulting-title">
          <div>
            <span className="eyebrow">Atendimento personalizado</span>
            <h2 id="consulting-title">Vamos criar o ambiente dos seus sonhos?</h2>
            <p>Conte o que você imaginou. Nosso time transforma suas ideias em um projeto feito para sua rotina.</p>
          </div>
          <a className="button button-light" href="mailto:atualdesigntorres@gmail.com">Bate-papo com um vendedor</a>
        </section>
      </main>

      <Footer />
    </>
  );
}
