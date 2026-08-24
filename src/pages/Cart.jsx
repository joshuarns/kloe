// ─────────────────────────────────────────────────────────────────────────────
// pages/Cart.jsx
//
// Carrito de compra: líneas editables (cantidad, eliminar) y resumen con
// subtotal, envío (gratis sobre el umbral) y total.
// ─────────────────────────────────────────────────────────────────────────────

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
} from "../config/constants";
import { useSEO } from "../hooks/useSEO";
import "./Cart.css";

export default function Cart() {
  useSEO({ title: "Carrito" });
  const { items, subtotal, setQty, removeItem } = useCart();

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const missingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (items.length === 0) {
    return (
      <Container className="py-5 text-center kloe-cart-empty">
        <div className="kloe-cart-empty-icon">🛍️</div>
        <h1 className="kloe-serif">Tu carrito está vacío</h1>
        <p className="text-muted">Aún no has añadido ninguna prenda.</p>
        <Link to="/tienda" className="btn-kloe mt-2 d-inline-block">
          Ir a la tienda
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4 py-md-5">
      <h1 className="kloe-cart-title">Carrito</h1>

      <Row className="gx-lg-5 gy-4">
        {/* ── Líneas ── */}
        <Col lg={8}>
          {missingForFree > 0 && (
            <div className="kloe-cart-freebar">
              Te faltan <strong>{formatPrice(missingForFree)}</strong> para
              envío gratis 🚚
            </div>
          )}

          <div className="kloe-cart-lines">
            {items.map((it) => (
              <div key={it.key} className="kloe-cart-line">
                <Link to={`/producto/${it.id}`} className="kloe-cart-thumb">
                  <img src={it.image} alt={it.name} />
                </Link>

                <div className="kloe-cart-line-info">
                  <Link to={`/producto/${it.id}`} className="kloe-cart-line-name">
                    {it.name}
                  </Link>
                  <div className="kloe-cart-line-meta">
                    Talla {it.size} · {it.color}
                  </div>
                  <button
                    className="kloe-cart-remove"
                    onClick={() => removeItem(it.key)}
                  >
                    Eliminar
                  </button>
                </div>

                <div className="kloe-cart-line-qty">
                  <div className="kloe-qty kloe-qty--sm">
                    <button
                      onClick={() => setQty(it.key, it.qty - 1)}
                      aria-label="Menos"
                    >
                      −
                    </button>
                    <span>{it.qty}</span>
                    <button
                      onClick={() => setQty(it.key, it.qty + 1)}
                      aria-label="Más"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="kloe-cart-line-price">
                  {formatPrice(it.price * it.qty)}
                </div>
              </div>
            ))}
          </div>

          <Link to="/tienda" className="kloe-cart-continue">
            ← Seguir comprando
          </Link>
        </Col>

        {/* ── Resumen ── */}
        <Col lg={4}>
          <div className="kloe-summary">
            <h2 className="kloe-summary-title">Resumen</h2>

            <div className="kloe-summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="kloe-summary-row">
              <span>Envío</span>
              <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
            </div>

            <div className="kloe-summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link to="/checkout" className="btn-kloe w-100 text-center d-block mt-3">
              Finalizar compra
            </Link>
            <p className="kloe-summary-note">Impuestos calculados en el pago.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
