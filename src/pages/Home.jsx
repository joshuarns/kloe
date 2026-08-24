// ─────────────────────────────────────────────────────────────────────────────
// pages/Home.jsx
//
// Inicio estilo Zara: fotografía editorial a sangre completa (full-bleed),
// etiqueta serif centrada y cuadrícula grande de novedades. Mínimo texto.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../data/products";
import ProductList from "../components/ProductList/ProductList";
import CategorySidebar from "../components/CategorySidebar/CategorySidebar";
import { useSEO } from "../hooks/useSEO";
import heroImg from "../assets/img/8a5f1fa0c8e53644e361b170caa74e13.jpg";
import "./Home.css";

export default function Home() {
  useSEO({
    title: "Inicio",
    description: "Kloe — ropa y accesorios con estilo. Descubre la colección.",
  });

  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    getProducts().then((all) => setNovedades(all.slice(0, 8)));
  }, []);

  return (
    <div className="kloe-home">
      {/* ── Sidebar sobrepuesto (solo escritorio), como en Zara ── */}
      <CategorySidebar />

      {/* ── Hero full-bleed ── */}
      <section className="kloe-hero">
        <img
          src={heroImg}
          alt="Nueva colección Kloe"
          className="kloe-hero-img"
        />
        <div className="kloe-hero-overlay">
          <p className="kloe-hero-eyebrow">Nueva temporada</p>
          <Link to="/tienda" className="btn-kloe kloe-hero-btn">
            Ver colección
          </Link>
        </div>
      </section>

      {/* ── Novedades ── */}
      <section className="kloe-home-grid">
        <p className="kloe-editorial-label">New Arrivals</p>
        <ProductList products={novedades} cols={4} />
        <div className="kloe-home-more">
          <Link to="/tienda" className="btn-kloe-outline">
            Ver todo
          </Link>
        </div>
      </section>

      {/* ── Banner editorial secundario ── */}
      <section className="kloe-splitbanner">
        <Link to="/tienda?genero=Mujer" className="kloe-split">
          <img
            src="https://picsum.photos/seed/kloe-women/800/1000"
            alt="Mujer"
          />
          <span className="kloe-split-label">Mujer</span>
        </Link>
        <Link to="/tienda?genero=Hombre" className="kloe-split">
          <img
            src="https://picsum.photos/seed/kloe-men/800/1000"
            alt="Hombre"
          />
          <span className="kloe-split-label">Hombre</span>
        </Link>
      </section>
    </div>
  );
}
