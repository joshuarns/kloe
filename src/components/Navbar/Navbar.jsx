// ─────────────────────────────────────────────────────────────────────────────
// components/Navbar/Navbar.jsx
//
// Header minimalista estilo Zara: hamburguesa a la izquierda (abre un menú
// offcanvas con todas las categorías), logotipo KLOE y, a la derecha, buscar
// y carrito con contador. Sticky y sin decoración.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CATEGORIES, GENDERS } from "../../data/products";
import { STORE_NAME } from "../../config/constants";
import "./Navbar.css";

export default function NavbarMenu() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <>
      <header className="kloe-header">
        <button
          className="kloe-hamburger"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>

        <Link to="/" className="kloe-logo kloe-serif">
          {STORE_NAME.toUpperCase()}
        </Link>

        <nav className="kloe-header-actions">
          <Link to="/tienda" className="kloe-header-link">
            Buscar
          </Link>
          <Link to="/carrito" className="kloe-header-link kloe-cart-link">
            Carrito
            <span className="kloe-cart-count">[{totalItems}]</span>
          </Link>
        </nav>
      </header>

      {/* ── Menú offcanvas ── */}
      <Offcanvas
        show={menuOpen}
        onHide={() => setMenuOpen(false)}
        placement="start"
        className="kloe-menu"
      >
        <Offcanvas.Header closeButton>
          <span className="kloe-serif kloe-menu-brand">
            {STORE_NAME.toUpperCase()}
          </span>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="kloe-menu-section">
            <button className="kloe-menu-item" onClick={() => go("/tienda")}>
              Ver todo
            </button>
            {GENDERS.map((g) => (
              <button
                key={g}
                className="kloe-menu-item"
                onClick={() => go(`/tienda?genero=${encodeURIComponent(g)}`)}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="kloe-menu-divider" />

          <div className="kloe-menu-section">
            <span className="kloe-menu-heading">Categorías</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="kloe-menu-item kloe-menu-item--sub"
                onClick={() => go(`/tienda?categoria=${encodeURIComponent(cat)}`)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="kloe-menu-divider" />

          <div className="kloe-menu-section">
            <button className="kloe-menu-item" onClick={() => go("/contacto")}>
              Contacto
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
