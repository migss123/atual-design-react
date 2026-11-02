import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoside1.png";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import CartDrawer from "./CartDrawer.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const busca = new URLSearchParams(location.search).get("busca") || "";
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount, toast } = useCart();

  function atualizarBusca(event) {
    const valor = event.target.value;
    navigate(valor ? `/biblioteca-designs?busca=${encodeURIComponent(valor)}` : "/biblioteca-designs");
  }

  return (
    <header className="navbar">
      <div className="nav-top">
        <NavLink to="/home" className="brand" aria-label="Atual Design - início">
          <img src={logo} alt="Atual Design" className="nav-logo" />
        </NavLink>

        <div className="nav-actions">
          <NavLink to="/perfil" className="nav-action">
            <span aria-hidden="true">◯</span>
            <span>Minha conta</span>
          </NavLink>
          <button className="nav-action nav-cart-button" type="button" onClick={() => setCartOpen(true)}>
            <span className="cart-icon" aria-hidden="true">🛒</span>
            <span>Carrinho</span>
            <strong className="cart-badge">{itemCount}</strong>
          </button>
        </div>
      </div>

      <div className="nav-bottom">
        <nav className="nav-right" aria-label="Navegação principal">
          <NavLink to="/home" className="nav-link">
            Início
          </NavLink>
          <NavLink to="/biblioteca-designs" className="nav-link">
            Biblioteca de designs
          </NavLink>
          <NavLink to="/perfil" className="nav-link">
            Perfil
          </NavLink>
          <NavLink to="/admin" className="nav-link nav-admin-link">
            Administração
          </NavLink>
        </nav>
        <label className="search-container">
          <span className="sr-only">Buscar projetos</span>
          <input
            className="search-input"
            type="search"
            value={busca}
            onChange={atualizarBusca}
            placeholder="O que você está procurando?"
            aria-label="Buscar designs"
          />
          <button className="search-btn" type="button" aria-label="Buscar" onClick={() => navigate("/biblioteca-designs")}>
            Buscar
          </button>
        </label>
      </div>

      <Breadcrumbs />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      {toast && <div className="cart-toast" role="status">{toast}</div>}
    </header>
  );
}
