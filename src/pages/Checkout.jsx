// ─────────────────────────────────────────────────────────────────────────────
// pages/Checkout.jsx
//
// Checkout de demostración. Recoge datos de envío y "confirma" el pedido
// (no hay cobro real; sin backend). Al confirmar, vacía el carrito y muestra
// la pantalla de agradecimiento.
//
// Cuando conectemos Stripe / backend, aquí se sustituye handleSubmit por la
// creación de la sesión de pago.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
} from "../config/constants";
import { useSEO } from "../hooks/useSEO";
import "./Checkout.css";

export default function Checkout() {
  useSEO({ title: "Pago" });
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simula creación de pedido
    const id = "KLOE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderId(id);
    setPlaced(true);
    clear();
    window.scrollTo(0, 0);
  };

  // Si el carrito está vacío y no acabamos de comprar, no hay nada que pagar
  if (items.length === 0 && !placed) {
    return <Navigate to="/carrito" replace />;
  }

  if (placed) {
    return (
      <Container className="py-5 text-center kloe-thanks">
        <div className="kloe-thanks-icon">✓</div>
        <h1 className="kloe-serif">¡Gracias por tu compra!</h1>
        <p className="text-muted">
          Tu pedido <strong>{orderId}</strong> ha sido confirmado.
          <br />
          (Demo — no se realizó ningún cobro real.)
        </p>
        <Link to="/tienda" className="btn-kloe mt-3 d-inline-block">
          Seguir comprando
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4 py-md-5">
      <h1 className="kloe-cart-title">Finalizar compra</h1>

      <Form onSubmit={handleSubmit}>
        <Row className="gx-lg-5 gy-4">
          {/* ── Datos ── */}
          <Col lg={7}>
            <section className="kloe-checkout-section">
              <h2 className="kloe-checkout-heading">Contacto</h2>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" required placeholder="tu@correo.com" />
              </Form.Group>
            </section>

            <section className="kloe-checkout-section">
              <h2 className="kloe-checkout-heading">Envío</h2>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control required />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control required placeholder="Calle y número" />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control required />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control required />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>C.P.</Form.Label>
                    <Form.Control required inputMode="numeric" />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control required type="tel" />
                  </Form.Group>
                </Col>
              </Row>
            </section>

            <section className="kloe-checkout-section">
              <h2 className="kloe-checkout-heading">Pago</h2>
              <div className="kloe-checkout-paynote">
                💳 Pasarela de pago pendiente de conexión. Al confirmar se
                registra un pedido de prueba.
              </div>
            </section>
          </Col>

          {/* ── Resumen ── */}
          <Col lg={5}>
            <div className="kloe-summary">
              <h2 className="kloe-summary-title">Tu pedido</h2>

              <div className="kloe-checkout-items">
                {items.map((it) => (
                  <div key={it.key} className="kloe-checkout-item">
                    <div className="kloe-checkout-item-thumb">
                      <img src={it.image} alt={it.name} />
                      <span className="kloe-checkout-item-qty">{it.qty}</span>
                    </div>
                    <div className="kloe-checkout-item-info">
                      <span>{it.name}</span>
                      <small>
                        {it.size} · {it.color}
                      </small>
                    </div>
                    <div className="kloe-checkout-item-price">
                      {formatPrice(it.price * it.qty)}
                    </div>
                  </div>
                ))}
              </div>

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

              <button type="submit" className="btn-kloe w-100 mt-3">
                Confirmar pedido
              </button>
              <Link to="/carrito" className="kloe-cart-continue d-block text-center mt-2">
                ← Volver al carrito
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
