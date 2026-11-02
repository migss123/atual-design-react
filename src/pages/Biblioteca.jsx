import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useCart } from "../context/CartContext.jsx";

const categorias = ["Todos", "Cozinha", "Sala de Estar", "Quarto", "Banheiro", "Escritório"];

const designsIniciais = [
  {
    id: 1,
    category: "Cozinha",
    title: "Cozinha Essencial",
    description: "Linhas limpas, materiais resistentes e espaço pensado para a rotina.",
    tags: ["planejados", "funcional"],
    tone: "project-sand",
    icon: "▦",
  },
  {
    id: 2,
    category: "Sala de Estar",
    title: "Living Contemporâneo",
    description: "Um living elegante que combina acolhimento, conforto e personalidade.",
    tags: ["contemporâneo", "integração"],
    tone: "project-clay",
    icon: "▤",
  },
  {
    id: 3,
    category: "Quarto",
    title: "Suíte Sereno",
    description: "Armários sob medida para transformar descanso em uma experiência.",
    tags: ["conforto", "madeira"],
    tone: "project-olive",
    icon: "▥",
  },
  {
    id: 4,
    category: "Escritório",
    title: "Estúdio Foco",
    description: "Um espaço organizado para trabalhar com produtividade e estilo.",
    tags: ["home office", "organização"],
    tone: "project-cream",
    icon: "◇",
  },
  {
    id: 5,
    category: "Cozinha",
    title: "Cozinha Terra",
    description: "Texturas naturais e soluções inteligentes para receber bem.",
    tags: ["acolhimento", "natural"],
    tone: "project-clay-light",
    icon: "▦",
  },
  {
    id: 6,
    category: "Banheiro",
    title: "Banho Horizonte",
    description: "Detalhes sofisticados para uma rotina mais leve e funcional.",
    tags: ["sofisticação", "compacto"],
    tone: "project-petroleum",
    icon: "◇",
  },
];

const designVazio = {
  title: "",
  category: "Cozinha",
  description: "",
  tags: "",
  image: "",
  tone: "project-sand",
  icon: "▦",
};

function designParaFormulario(design) {
  return {
    ...design,
    tags: Array.isArray(design.tags) ? design.tags.join(", ") : design.tags || "",
  };
}

export default function Biblioteca() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [designs, setDesigns] = useState(designsIniciais);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [designEditando, setDesignEditando] = useState(null);
  const [formulario, setFormulario] = useState(designVazio);
  const [designDetalhado, setDesignDetalhado] = useState(null);
  const { addToCart, items } = useCart();
  const busca = searchParams.get("busca") || "";
  const isAdmin = true;

  const designsFiltrados = useMemo(() => {
    const termo = busca.toLocaleLowerCase().trim();

    return designs.filter((design) => {
      const correspondeCategoria =
        categoriaAtiva === "Todos" || design.category === categoriaAtiva;
      const textoPesquisavel = [
        design.title,
        design.category,
        design.description,
        ...(design.tags || []),
      ].join(" ").toLocaleLowerCase();

      return correspondeCategoria && (!termo || textoPesquisavel.includes(termo));
    });
  }, [busca, categoriaAtiva, designs]);

  useEffect(() => {
    document.title = busca ? `Busca: ${busca} | Atual Design` : "Biblioteca de designs | Atual Design";
  }, [busca]);

  function atualizarBusca(event) {
    const valor = event.target.value;
    setSearchParams(valor ? { busca: valor } : {});
  }

  function abrirNovoDesign() {
    setDesignEditando(null);
    setFormulario(designVazio);
    setModalAberto(true);
  }

  function abrirEdicao(design) {
    setDesignEditando(design.id);
    setFormulario(designParaFormulario(design));
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setDesignEditando(null);
  }

  function atualizarFormulario(event) {
    const { name, value } = event.target;
    setFormulario((atual) => ({ ...atual, [name]: value }));
  }

  function atualizarImagem(event) {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    const imagem = URL.createObjectURL(arquivo);
    setFormulario((atual) => ({ ...atual, image: imagem }));
  }

  function limparImagem(event) {
    event.stopPropagation();
    setFormulario((atual) => ({ ...atual, image: "" }));
  }

  function salvarDesign(event) {
    event.preventDefault();
    const design = {
      ...formulario,
      id: designEditando || Date.now(),
      tags: formulario.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      icon: formulario.icon || "◇",
    };

    setDesigns((atuais) =>
      designEditando
        ? atuais.map((item) => (item.id === designEditando ? design : item))
        : [design, ...atuais],
    );
    fecharModal();
  }

  function excluirDesign(id) {
    if (window.confirm("Deseja excluir este design?")) {
      setDesigns((atuais) => atuais.filter((design) => design.id !== id));
    }

    function adicionarDesign(design) {
      addToCart(design);
    }
  }

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
          {isAdmin && (
            <button className="button button-primary" type="button" onClick={abrirNovoDesign}>
              ＋ Adicionar novo design
            </button>
          )}
        </section>

        <div className="catalog-toolbar">
          <div className="catalog-filters" aria-label="Filtrar por categoria">
            {categorias.map((categoria) => (
              <button
                className={`filter-button ${categoriaAtiva === categoria ? "active" : ""}`}
                key={categoria}
                type="button"
                onClick={() => setCategoriaAtiva(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>
          <label className="catalog-search">
            <span className="sr-only">Buscar designs</span>
            <input
              type="search"
              value={busca}
              onChange={atualizarBusca}
              placeholder="Buscar designs..."
            />
          </label>
        </div>

        <p className="catalog-result-count">
          {designsFiltrados.length} {designsFiltrados.length === 1 ? "design encontrado" : "designs encontrados"}
        </p>

        <section className="catalog-grid" aria-label="Designs disponíveis">
          {designsFiltrados.map((design) => (
            <article className="catalog-card" key={design.id}>
              <div className={`project-image ${design.tone}`}>
                {design.image ? (
                  <img className="design-image" src={design.image} alt="" />
                ) : (
                  <span className="project-icon" aria-hidden="true">{design.icon}</span>
                )}
                <span className="project-tag">{design.category}</span>
              </div>
              <div className="catalog-card-content">
                <span className="catalog-label">{design.tags?.join(" · ") || "Projeto sob medida"}</span>
                <h2>{design.title}</h2>
                <p className="catalog-description">{design.description}</p>
                <div className="catalog-card-actions">
                  <button className="small-action" type="button" onClick={() => setDesignDetalhado(design)}>
                    Ver detalhes
                  </button>
                  <button className="button button-primary catalog-cart-button" type="button" onClick={() => adicionarDesign(design)}>
                    {items.some((item) => item.id === design.id) ? "Adicionar novamente" : "Adicionar ao projeto"}
                  </button>
                </div>
                {isAdmin && (
                  <div className="catalog-admin-actions">
                    <button className="small-action" type="button" onClick={() => abrirEdicao(design)}>
                      Editar
                    </button>
                    <button className="small-action danger-action" type="button" onClick={() => excluirDesign(design.id)}>
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

        {designsFiltrados.length === 0 && (
          <div className="catalog-empty">
            <h2>Nenhum design encontrado</h2>
            <p>Tente buscar por outro termo ou selecione uma categoria diferente.</p>
          </div>
        )}
      </main>

      {designDetalhado && (
        <div className="design-modal-backdrop" role="presentation" onMouseDown={() => setDesignDetalhado(null)}>
          <section className="design-details-modal" role="dialog" aria-modal="true" aria-labelledby="design-details-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className={`design-details-image ${designDetalhado.tone}`}>
              {designDetalhado.image ? <img src={designDetalhado.image} alt="" /> : <span aria-hidden="true">{designDetalhado.icon}</span>}
            </div>
            <div className="design-details-content">
              <div className="design-modal-heading">
                <div>
                  <span className="eyebrow eyebrow-dark">{designDetalhado.category}</span>
                  <h2 id="design-details-title">{designDetalhado.title}</h2>
                </div>
                <button className="modal-close" type="button" onClick={() => setDesignDetalhado(null)} aria-label="Fechar detalhes">×</button>
              </div>
              <p>{designDetalhado.description}</p>
              <span className="design-budget">Orçamento sob consulta</span>
              <div className="design-details-tags">{designDetalhado.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <button className="button button-primary details-cart-button" type="button" onClick={() => adicionarDesign(designDetalhado)}>
                {items.some((item) => item.id === designDetalhado.id) ? "Adicionar mais uma unidade" : "Adicionar ao projeto"}
              </button>
            </div>
          </section>
        </div>
      )}

      {modalAberto && (
        <div className="design-modal-backdrop" role="presentation" onMouseDown={fecharModal}>
          <section
            className="design-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="design-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="design-modal-heading">
              <div>
                <span className="eyebrow eyebrow-dark">Área administrativa</span>
                <h2 id="design-modal-title">{designEditando ? "Editar design" : "Adicionar novo design"}</h2>
              </div>
              <button className="modal-close" type="button" onClick={fecharModal} aria-label="Fechar formulário">×</button>
            </div>
            <form className="design-form" onSubmit={salvarDesign}>
              <label className="design-upload">
                <span>Imagem principal</span>
                {formulario.image ? (
                  <img src={formulario.image} alt="Pré-visualização do design" />
                ) : (
                  <strong>Selecionar foto</strong>
                )}
                {formulario.image && (
                  <span className="design-upload-actions">
                    <button className="clear-image-button" type="button" onClick={limparImagem}>
                      Limpar imagem
                    </button>
                    <small>ou clique para trocar</small>
                  </span>
                )}
                <input type="file" accept="image/*" onChange={atualizarImagem} />
              </label>
              <div className="form-group">
                <label htmlFor="design-title">Título</label>
                <input id="design-title" name="title" value={formulario.title} onChange={atualizarFormulario} required />
              </div>
              <div className="form-group">
                <label htmlFor="design-category">Categoria</label>
                <select id="design-category" name="category" value={formulario.category} onChange={atualizarFormulario}>
                  {categorias.slice(1).map((categoria) => <option key={categoria}>{categoria}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="design-tags">Tags <small>(separadas por vírgula)</small></label>
                <input id="design-tags" name="tags" value={formulario.tags} onChange={atualizarFormulario} placeholder="ex.: moderno, madeira" />
              </div>
              <div className="form-group">
                <label htmlFor="design-description">Descrição</label>
                <textarea id="design-description" name="description" rows="4" value={formulario.description} onChange={atualizarFormulario} required />
              </div>
              <div className="design-form-actions">
                <button className="button button-outline-dark" type="button" onClick={fecharModal}>Cancelar</button>
                <button className="button button-primary" type="submit">Salvar design</button>
              </div>
            </form>
          </section>
        </div>
      )}

      <Footer />
    </>
  );
}
