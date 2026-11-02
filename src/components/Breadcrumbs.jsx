import { NavLink, useLocation } from "react-router-dom";

const labels = {
  "/home": "Início",
  "/biblioteca": "Biblioteca de designs",
  "/biblioteca-designs": "Biblioteca de designs",
  "/perfil": "Perfil",
  "/admin": "Administração",
  "/chat": "Bate-papo com vendedor",
  "/login": "Entrar",
  "/cadastro": "Cadastro",
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const currentLabel = labels[pathname] || "Página";
  const isHome = pathname === "/home" || pathname === "/";

  if (isHome) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="Migalhas de navegação">
      <NavLink to="/home">Início</NavLink>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{currentLabel}</span>
    </nav>
  );
}
