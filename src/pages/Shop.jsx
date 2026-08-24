// ─────────────────────────────────────────────────────────────────────────────
// pages/Shop.jsx
//
// Listado (PLP) estilo Zara.
//   · Escritorio: sidebar FIJO (sticky) a la izquierda con las subcategorías
//     numeradas (|01| VER TODO, |02| …) + FILTROS + EN TIENDA.
//   · Móvil: el sidebar se oculta y se muestra una fila de tabs horizontal.
// Los filtros (género, categoría, talla, orden) viven en la URL.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import {
  getProducts,
  CATEGORIES,
  GENDERS,
  ALL_SIZES,
} from "../data/products";
import ProductList from "../components/ProductList/ProductList";
import CategorySidebar from "../components/CategorySidebar/CategorySidebar";
import { useSEO } from "../hooks/useSEO";
import heroImg from "../assets/img/8a5f1fa0c8e53644e361b170caa74e13.jpg";
import "./Shop.css";

const ORDER_OPTIONS = [
  { value: "destacados", label: "Destacados" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nuevos", label: "Novedades" },
];

// Lista de subcategorías para los tabs de móvil: "Ver todo" + categorías.
const NAV_ITEMS = ["", ...CATEGORIES];

export default function Shop() {
  useSEO({
    title: "Tienda",
    description:
      "Explora toda la colección de Kloe con filtros por categoría, género y talla.",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [cols, setCols] = useState(3); // densidad del grid (2 | 3 | 4)
  const [params, setParams] = useSearchParams();

  const categoria = params.get("categoria") || "";
  const genero = params.get("genero") || "";
  const talla = params.get("talla") || "";
  const orden = params.get("orden") || "destacados";

  useEffect(() => {
    getProducts().then((all) => {
      setProducts(all);
      setLoading(false);
    });
  }, []);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  const clearFilters = () => {
    const next = new URLSearchParams();
    if (orden !== "destacados") next.set("orden", orden);
    setParams(next);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (categoria) list = list.filter((p) => p.category === categoria);
    if (genero) list = list.filter((p) => p.gender === genero);
    if (talla) list = list.filter((p) => p.sizes.includes(talla));

    switch (orden) {
      case "precio-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "precio-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "nuevos":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        break;
    }
    return list;
  }, [products, categoria, genero, talla, orden]);

  const activeCount = [categoria, genero, talla].filter(Boolean).length;

  const FiltersBody = () => (
    <div className="kloe-filters">
      <div className="kloe-filter-group">
        <h6 className="kloe-filter-title">Género</h6>
        {GENDERS.map((g) => (
          <button
            key={g}
            className={`kloe-filter-opt ${genero === g ? "is-active" : ""}`}
            onClick={() => setParam("genero", genero === g ? "" : g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="kloe-filter-group">
        <h6 className="kloe-filter-title">Categoría</h6>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`kloe-filter-opt ${categoria === c ? "is-active" : ""}`}
            onClick={() => setParam("categoria", categoria === c ? "" : c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="kloe-filter-group">
        <h6 className="kloe-filter-title">Talla</h6>
        <div className="kloe-size-grid">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              type="button"
              className={`kloe-size-btn ${talla === s ? "is-active" : ""}`}
              onClick={() => setParam("talla", talla === s ? "" : s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <button className="kloe-clear-btn" onClick={clearFilters}>
          Limpiar filtros ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="kloe-shop">
      {/* ── Tabs horizontales (solo móvil) ── */}
      <div className="kloe-tabs kloe-only-mobile">
        {NAV_ITEMS.map((c) => (
          <button
            key={c || "all"}
            className={`kloe-tab ${categoria === c ? "is-active" : ""}`}
            onClick={() => setParam("categoria", c)}
          >
            {c || "Ver todo"}
          </button>
        ))}
      </div>

      {/* ── Sidebar sobrepuesto (solo escritorio) ── */}
      <CategorySidebar
        activeCategory={categoria}
        onSelectCategory={(c) => setParam("categoria", c)}
        onOpenFilters={() => setShowFilters(true)}
        density={{ cols, onCols: setCols }}
      />

      <div className="kloe-plp">
        {/* ── Contenido principal ── */}
        <div className="kloe-plp-main">
          <section className="kloe-shop-hero">
            <img src={heroImg} alt="Colección" />
            <p className="kloe-editorial-label kloe-shop-hero-label">
              {categoria || genero || "The Collection"}
            </p>
          </section>

          {/* Barra de herramientas (orden + densidad/filtros en móvil) */}
          <div className="kloe-toolbar">
            <span className="kloe-toolbar-count">
              {loading ? "…" : `${filtered.length} artículos`}
            </span>

            <div className="kloe-toolbar-right">
              <button
                className="kloe-toolbar-btn kloe-only-mobile"
                onClick={() => setShowFilters(true)}
              >
                Filtros{activeCount > 0 ? ` (${activeCount})` : ""}
              </button>

              <Form.Select
                size="sm"
                value={orden}
                onChange={(e) => setParam("orden", e.target.value)}
                className="kloe-order-select"
                aria-label="Ordenar"
              >
                {ORDER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          <div className="kloe-shop-body">
            {loading ? (
              <div className="kloe-shop-loading">Cargando…</div>
            ) : (
              <ProductList products={filtered} cols={cols} />
            )}
          </div>
        </div>
      </div>

      {/* ── Offcanvas de filtros ── */}
      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
        className="kloe-menu"
      >
        <Offcanvas.Header closeButton>
          <span className="kloe-menu-heading" style={{ margin: 0 }}>
            Filtros
          </span>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FiltersBody />
          <button
            className="btn-kloe w-100 mt-4"
            onClick={() => setShowFilters(false)}
          >
            Ver {filtered.length} artículos
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
