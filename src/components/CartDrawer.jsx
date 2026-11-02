import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { items, projectCount, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();

  async function solicitarOrcamento() {
    const resumo = items
      .map((item) => `${item.quantity}x ${item.title} (${item.category})`)
      .join("; ");

    await clearCart();
    onClose();
    navigate("/chat", {
      state: {
        cartSummary: `Olá! Gostaria de solicitar um orçamento para: ${resumo}.`,
      },
    });
  }

  return (
    <>
      {open && <button className="cart-drawer-backdrop" type="button" aria-label="Fechar carrinho" onClick={onClose} />}
      <aside className={`cart-drawer ${open ? "is-open" : ""}`} aria-hidden={!open} aria-labelledby="cart-drawer-title">
        <div className="cart-drawer-header">
          <div>
            <span className="eyebrow eyebrow-dark">Seus projetos</span>
            <h2 id="cart-drawer-title">Carrinho</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar carrinho">×</button>
        </div>

        <div className="cart-drawer-content">
          {items.length ? (
            items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className={`cart-item-image ${item.tone}`}>
                  {item.image ? <img src={item.image} alt="" /> : <span aria-hidden="true">{item.icon}</span>}
                </div>
                <div className="cart-item-info">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <small>Orçamento sob consulta</small>
                  <div className="cart-item-actions">
                    <div className="quantity-control" aria-label={`Quantidade de ${item.title}`}>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1} aria-label="Diminuir quantidade">−</button>
                      <strong>{item.quantity}</strong>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Aumentar quantidade">＋</button>
                    </div>
                    <button className="cart-remove" type="button" onClick={() => removeFromCart(item.id)}>Remover</button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="cart-empty">
              <span className="cart-empty-icon" aria-hidden="true">＋</span>
              <strong>Seu carrinho está vazio</strong>
              <p>Adicione designs para reunir suas referências em um só lugar.</p>
            </div>
          )}
        </div>

        <footer className="cart-drawer-footer">
          <div className="cart-summary">
            <span>{projectCount} {projectCount === 1 ? "projeto selecionado" : "projetos selecionados"}</span>
            <strong>{itemCount} {itemCount === 1 ? "item" : "itens"}</strong>
          </div>
          <p>Os valores são definidos após análise do seu projeto.</p>
          <button className="button button-primary cart-checkout" type="button" disabled={!items.length} onClick={solicitarOrcamento}>
            Solicitar orçamento
          </button>
          {items.length > 0 && <button className="cart-clear" type="button" onClick={clearCart}>Limpar carrinho</button>}
        </footer>
      </aside>
    </>
  );
}
