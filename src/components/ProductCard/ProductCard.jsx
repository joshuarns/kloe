// ─────────────────────────────────────────────────────────────────────────────
// components/ProductCard/ProductCard.jsx
//
// Tarjeta de producto estilo Zara: imagen grande sobre fondo gris (cambia a la
// segunda foto al pasar el cursor), etiqueta "NEW" en texto, nombre en
// mayúsculas y precio. Sin swatches, badges de color ni bordes redondeados.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { formatPrice } from "../../config/constants";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { id, name, price, compareAt, images, isNew, stock } = product;
  const soldOut = stock === 0;
  const hoverImg = images[1] || images[0];

  return (
    <Link to={`/producto/${id}`} className="kloe-card">
      <div className="kloe-card-media">
        <img className="kloe-card-img kloe-card-img--main" src={images[0]} alt={name} loading="lazy" />
        <img className="kloe-card-img kloe-card-img--hover" src={hoverImg} alt="" loading="lazy" aria-hidden="true" />
        {soldOut && <span className="kloe-card-out">Agotado</span>}
      </div>

      <div className="kloe-card-body">
        {isNew && !soldOut && <span className="kloe-card-tag">New</span>}
        <h3 className="kloe-card-name">{name}</h3>
        <div className="kloe-card-price">
          <span className={compareAt ? "kloe-price--sale" : ""}>
            {formatPrice(price)}
          </span>
          {compareAt && (
            <span className="kloe-price--old">{formatPrice(compareAt)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
