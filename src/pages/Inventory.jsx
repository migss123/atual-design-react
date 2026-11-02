import { useMemo, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useInventory } from "../context/InventoryContext.jsx";

const categories = ["Tecidos", "Madeiras", "Puxadores", "Tintas", "Ferragens"];
const units = ["unidades", "metros", "m²", "kg", "litros", "chapas"];

function getStatus(quantity) {
  if (quantity <= 0) return "Esgotado";
  if (quantity <= 10) return "Estoque Baixo";
  return "Em Estoque";
}

function emptyForm() {
  return {
    nome: "", codigo: "", imagem: "", categoria: categories[0], quantidade: "",
    unidade: units[0], custo: "", customFields: [], variantes: [],
  };
}

function StockThumbnail({ item, large = false }) {
  return item.imagem ? (
    <img className={`stock-thumbnail ${large ? "stock-thumbnail-large" : ""}`} src={item.imagem} alt="" />
  ) : (
    <span className={`stock-thumbnail stock-placeholder ${large ? "stock-thumbnail-large" : ""}`} aria-hidden="true">
      {item.nome.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function Inventory() {
  const { insumos, handleAddInsumo, handleUpdateInsumo, handleDeleteInsumo } = useInventory();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [newCategory, setNewCategory] = useState("");
  const [newVariant, setNewVariant] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredItems = useMemo(() => insumos.filter((item) => {
    const text = `${item.nome} ${item.codigo}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase()))
      && (!category || item.categoria === category)
      && (!status || getStatus(item.quantidade) === status);
  }), [insumos, query, category, status]);

  function openCreate() {
    setForm(emptyForm());
    setNewCategory("");
    setNewVariant("");
    setModal("create");
  }

  function openEdit(item) {
    setForm({ ...item, quantidade: String(item.quantidade), custo: String(item.custo), customFields: item.customFields || [], variantes: item.variantes || [] });
    setNewCategory("");
    setNewVariant("");
    setModal("edit");
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, imagem: reader.result }));
    reader.readAsDataURL(file);
  }

  function addCustomField() {
    setForm((current) => ({ ...current, customFields: [...current.customFields, { id: crypto.randomUUID(), label: "", value: "" }] }));
  }

  function updateCustomField(id, key, value) {
    setForm((current) => ({ ...current, customFields: current.customFields.map((field) => field.id === id ? { ...field, [key]: value } : field) }));
  }

  function addVariant() {
    const value = newVariant.trim();
    if (!value || form.variantes.includes(value)) return;
    setForm((current) => ({ ...current, variantes: [...current.variantes, value] }));
    setNewVariant("");
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      categoria: newCategory.trim() || form.categoria,
      quantidade: Number(form.quantidade) || 0,
      custo: Number(form.custo) || 0,
      customFields: form.customFields.filter((field) => field.label.trim() && field.value.trim()),
    };
    if (modal === "edit") await handleUpdateInsumo(form.id, payload);
    else await handleAddInsumo(payload);
    setSaving(false);
    setModal(null);
  }

  async function remove(item) {
    if (window.confirm(`Excluir o insumo "${item.nome}"?`)) await handleDeleteInsumo(item.id);
  }

  return (
    <>
      <Navbar />
      <main className="admin-container inventory-page">
        <div className="inventory-heading">
          <div>
            <span className="eyebrow eyebrow-dark">Operação</span>
            <h1>Gerenciamento de estoque</h1>
            <p>Controle os insumos e matérias-primas da sua produção.</p>
          </div>
          <button className="button button-primary" type="button" onClick={openCreate}>＋ Cadastrar novo insumo</button>
        </div>

        <section className="inventory-toolbar" aria-label="Filtros do estoque">
          <label className="inventory-search">
            <span className="sr-only">Buscar por nome ou código</span>
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome ou código" />
          </label>
          <label>
            <span className="sr-only">Filtrar por categoria</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">Todas as categorias</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Filtrar por status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">Todos os status</option>
              <option>Em Estoque</option><option>Estoque Baixo</option><option>Esgotado</option>
            </select>
          </label>
        </section>

        <div className="inventory-summary"><strong>{filteredItems.length}</strong> insumos encontrados <span>•</span> dados sincronizados localmente</div>
        <section className="inventory-table-wrap">
          <table className="inventory-table">
            <thead><tr><th>Insumo</th><th>Categoria</th><th>Quantidade</th><th>Unidade</th><th>Custo unitário</th><th>Status</th><th><span className="sr-only">Ações</span></th></tr></thead>
            <tbody>
              {filteredItems.map((item) => {
                const itemStatus = getStatus(item.quantidade);
                return <tr key={item.id}>
                  <td><div className="stock-item"><StockThumbnail item={item} /><div><strong>{item.nome}</strong><small>{item.codigo || "Sem código"}</small></div></div></td>
                  <td>{item.categoria}</td><td className="quantity-cell">{item.quantidade}</td><td>{item.unidade}</td>
                  <td>R$ {item.custo.toFixed(2).replace(".", ",")}</td>
                  <td><span className={`stock-status status-${itemStatus.toLowerCase().replace(" ", "-")}`}>{itemStatus}</span></td>
                  <td><div className="row-actions"><button type="button" onClick={() => openEdit(item)}>Editar</button><button type="button" className="delete-action" onClick={() => remove(item)}>Excluir</button></div></td>
                </tr>;
              })}
            </tbody>
          </table>
          {!filteredItems.length && <div className="empty-inventory"><strong>Nenhum insumo encontrado</strong><span>Ajuste os filtros ou cadastre um novo item.</span></div>}
        </section>
      </main>
      <Footer />

      {modal && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}>
        <section className="inventory-modal" role="dialog" aria-modal="true" aria-labelledby="inventory-modal-title">
          <div className="modal-heading"><div><span className="eyebrow eyebrow-dark">Cadastro de insumo</span><h2 id="inventory-modal-title">{modal === "edit" ? "Editar insumo" : "Novo insumo"}</h2></div><button className="modal-close" type="button" onClick={() => setModal(null)} aria-label="Fechar">×</button></div>
          <form onSubmit={submit}>
            <div className="form-grid">
              <label className="image-upload"><span>Foto do insumo</span><div className="upload-preview">{form.imagem ? <img src={form.imagem} alt="Pré-visualização do insumo" /> : <span aria-hidden="true">＋</span>}</div><input type="file" accept="image/*" onChange={handleImage} /><small>JPG ou PNG até 5 MB</small></label>
              <div className="form-fields">
                <label>Nome do insumo *<input name="nome" value={form.nome} onChange={updateField} required placeholder="Ex.: MDF 15mm" /></label>
                <label>Código interno<input name="codigo" value={form.codigo} onChange={updateField} placeholder="Ex.: MD-015" /></label>
                <div className="form-row"><label>Categoria *<select name="categoria" value={form.categoria} onChange={updateField}>{categories.map((item) => <option key={item}>{item}</option>)}{newCategory && <option>{newCategory}</option>}</select></label><label>Ou criar categoria<input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Nova categoria" /></label></div>
                <div className="form-row"><label>Quantidade *<input name="quantidade" type="number" min="0" step="any" value={form.quantidade} onChange={updateField} required /></label><label>Unidade *<select name="unidade" value={form.unidade} onChange={updateField}>{units.map((item) => <option key={item}>{item}</option>)}</select></label><label>Custo unitário *<input name="custo" type="number" min="0" step="0.01" value={form.custo} onChange={updateField} required /></label></div>
              </div>
            </div>
            <fieldset className="custom-fields"><legend>Atributos personalizados <button type="button" onClick={addCustomField}>＋ Adicionar campo</button></legend>{form.customFields.map((field) => <div className="custom-field-row" key={field.id}><input value={field.label} onChange={(event) => updateCustomField(field.id, "label", event.target.value)} placeholder="Ex.: Cor" /><input value={field.value} onChange={(event) => updateCustomField(field.id, "value", event.target.value)} placeholder="Ex.: Carvalho" /></div>)}</fieldset>
            <fieldset className="custom-fields"><legend>Variantes e opções <span>Ex.: cores e acabamentos</span></legend><div className="variant-input"><input value={newVariant} onChange={(event) => setNewVariant(event.target.value)} onKeyDown={(event) => event.key === "Enter" && (event.preventDefault(), addVariant())} placeholder="Adicionar opção" /><button type="button" onClick={addVariant}>Adicionar</button></div><div className="variant-list">{form.variantes.map((variant) => <span key={variant}>{variant}<button type="button" onClick={() => setForm((current) => ({ ...current, variantes: current.variantes.filter((item) => item !== variant) }))} aria-label={`Remover ${variant}`}>×</button></span>)}</div></fieldset>
            <div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setModal(null)}>Cancelar</button><button type="submit" className="button button-primary" disabled={saving}>{saving ? "Salvando..." : "Salvar insumo"}</button></div>
          </form>
        </section>
      </div>}
    </>
  );
}
