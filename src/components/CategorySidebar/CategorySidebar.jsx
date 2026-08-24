// ─────────────────────────────────────────────────────────────────────────────
// components/CategorySidebar/CategorySidebar.jsx
//
// Sidebar de categorías sobrepuesto (overlay fijo) estilo Zara. Se usa tanto en
// el Home como en la Tienda.
//
//   · Categorías numeradas |01| VER TODO … El ítem activo va en negrita.
//   · Si se pasa `onSelectCategory`, cada ítem es un botón que lo invoca
//     (Tienda: filtra en la misma página conservando los demás filtros).
//     Si no, cada ítem es un enlace a /tienda?categoria=… (Home).
//   · FILTROS: botón si se pasa `onOpenFilters` (Tienda abre el panel);
//     si no, enlaza a /tienda (Home).
//   · `density` (opcional) muestra el selector de densidad del grid (Tienda).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data/products";
import "./CategorySidebar.css";

const NAV_ITEMS = ["", ...CATEGORIES];
const pad = (n) => String(n).padStart(2, "0");

export default function CategorySidebar({
  activeCategory = "",
  onSelectCategory,
  onOpenFilters,
  density,
}) {
  // Ocultar al bajar / mostrar al subir (según la dirección del scroll).
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (Math.abs(diff) < 6) return; // umbral: evita parpadeo con micro-scrolls
      if (diff > 0 && y > 120) {
        setHidden(true); // bajando
      } else {
        setHidden(false); // subiendo (o cerca del tope)
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className={`kloe-sidebar ${hidden ? "is-hidden" : ""}`}>
      <nav className="kloe-sidebar-nav">
        {NAV_ITEMS.map((c, i) => {
          const active = activeCategory === c;
          const label = c || "Ver todo";
          const cls = `kloe-sidebar-item ${active ? "is-active" : ""}`;
          const content = (
            <>
              <span className="kloe-sidebar-num">|{pad(i + 1)}|</span>
              {label}
            </>
          );

          return onSelectCategory ? (
            <button
              key={c || "all"}
              className={cls}
              onClick={() => onSelectCategory(c)}
            >
              {content}
            </button>
          ) : (
            <Link
              key={c || "all"}
              className={cls}
              to={c ? `/tienda?categoria=${encodeURIComponent(c)}` : "/tienda"}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="kloe-sidebar-actions">
        {onOpenFilters ? (
          <button className="kloe-sidebar-action" onClick={onOpenFilters}>
            Filtros
          </button>
        ) : (
          <Link className="kloe-sidebar-action" to="/tienda">
            Filtros
          </Link>
        )}
        <Link to="/contacto" className="kloe-sidebar-action">
          En tienda
        </Link>
      </div>

      {density && (
        <div className="kloe-sidebar-density" role="group" aria-label="Densidad">
          <button
            className={density.cols === 2 ? "is-active" : ""}
            onClick={() => density.onCols(2)}
            title="Vista amplia"
          >
            ▢▢
          </button>
          <button
            className={density.cols === 3 ? "is-active" : ""}
            onClick={() => density.onCols(3)}
            title="Vista media"
          >
            ▤
          </button>
          <button
            className={density.cols === 4 ? "is-active" : ""}
            onClick={() => density.onCols(4)}
            title="Vista compacta"
          >
            ▦
          </button>
        </div>
      )}
    </aside>
  );
}
