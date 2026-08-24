// components/ProductList/ProductList.jsx
// Cuadrícula de producto estilo Zara. `cols` controla la densidad en desktop
// (2 = imágenes grandes, 4 = compacto). En móvil siempre son 2 columnas.
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

export default function ProductList({ products, cols = 3 }) {
  if (!products.length) {
    return (
      <div className="kloe-empty">
        <p className="kloe-eyebrow">Sin resultados</p>
        <p>No encontramos prendas con estos filtros.</p>
      </div>
    );
  }

  return (
    <div className="kloe-grid" data-cols={cols}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
