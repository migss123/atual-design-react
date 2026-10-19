import { NavLink } from "react-router-dom";
import logo from "../assets/logoside1.png";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-top">
        <NavLink to="/home" className="brand" aria-label="Atual Design - início">
          <img src={logo} alt="Atual Design" className="nav-logo" />
          <span className="brand-copy">
            <strong>Atual Design</strong>
            <small>Móveis sob medida com alto padrão de qualidade</small>
          </span>
        </NavLink>

        <div className="nav-actions">
          <NavLink to="/perfil" className="nav-action">
            <span aria-hidden="true">◯</span>
            <span>Minha conta</span>
          </NavLink>
          <NavLink to="/biblioteca" className="nav-action nav-cart">
            <span aria-hidden="true">＋</span>
            <span>Projetos salvos</span>
          </NavLink>
        </div>
      </div>

      <div className="nav-bottom">
        <nav className="nav-right" aria-label="Navegação principal">
          <NavLink to="/home" className="nav-link">
            Início
          </NavLink>
          <NavLink to="/biblioteca" className="nav-link">
            Biblioteca de designs
          </NavLink>
          <NavLink to="/perfil" className="nav-link">
            Perfil
          </NavLink>
        </nav>
        <label className="search-container">
          <span className="sr-only">Buscar projetos</span>
          <input className="search-input" type="search" placeholder="O que você está procurando?" />
          <button className="search-btn" type="button" aria-label="Buscar">
            Buscar
          </button>
        </label>
      </div>
    </header>
  );
}
