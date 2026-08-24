// ─────────────────────────────────────────────────────────────────────────────
// pages/ProductDetail.jsx
//
// Ficha de una prenda: galería de imágenes, selección de color y talla
// (la talla es obligatoria antes de añadir), cantidad y botón de compra.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getProductById } from "../data/products";
import { formatPrice } from "../config/constants";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useSEO } from "../hooks/useSEO";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { show } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  useSEO({ title: product?.name });

  useEffect(() => {
    setLoading(true);
    getProductById(id).then((p) => {
      setProduct(p);
      setColor(p?.colors?.[0]?.name ?? null);
      setActiveImg(0);
      setSize(null);
      setQty(1);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center text-muted">Cargando…</Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2 className="kloe-serif">Prenda no encontrada</h2>
        <p className="text-muted">Puede que ya no esté disponible.</p>
        <Link to="/tienda" className="btn-kloe mt-2 d-inline-block">
          Volver a la tienda
        </Link>
      </Container>
    );
  }

  const soldOut = product.stock === 0;
  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(
          ((product.compareAt - product.price) / product.compareAt) * 100
        )
      : 0;

  const handleAdd = () => {
    if (soldOut) return;
    if (!size) {
      setSizeError(true);
      show("Elige una talla", "error");
      return;
    }
    addItem(product, { size, color, qty });
    show(`Añadido: ${product.name} (${size})`, "success");
  };

  const handleBuyNow = () => {
    if (soldOut) return;
    if (!size) {
      setSizeError(true);
      show("Elige una talla", "error");
      return;
    }
    addItem(product, { size, color, qty });
    navigate("/carrito");
  };

  return (
    <Container className="py-4 py-md-5">
      <div className="kloe-breadcrumb">
        <Link to="/">Inicio</Link> ·{" "}
        <Link to="/tienda">Tienda</Link> ·{" "}
        <Link to={`/tienda?categoria=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
      </div>

      <Row className="gx-lg-5 gy-4">
        {/* ── Galería ── */}
        <Col lg={7}>
          <div className="kloe-gallery">
            <div className="kloe-gallery-main">
              <img src={product.images[activeImg]} alt={product.name} />
            </div>
            {product.images.length > 1 && (
              <div className="kloe-gallery-thumbs">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    className={`kloe-thumb ${i === activeImg ? "is-active" : ""}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Imagen ${i + 1}`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Col>

        {/* ── Información ── */}
        <Col lg={5}>
          <div className="kloe-pd-info">
            <p className="kloe-eyebrow">{product.gender}</p>
            <h1 className="kloe-pd-title">{product.name}</h1>

            <div className="kloe-pd-price">
              <span className={product.compareAt ? "kloe-price--sale" : ""}>
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <>
                  <span className="kloe-price--old">
                    {formatPrice(product.compareAt)}
                  </span>
                  <span className="kloe-pd-discount">-{discount}%</span>
                </>
              )}
            </div>

            <p className="kloe-pd-desc">{product.description}</p>

            {/* Color */}
            <div className="kloe-pd-block">
              <span className="kloe-pd-label">
                Color: <strong>{color}</strong>
              </span>
              <div className="kloe-pd-colors">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    className={`kloe-color-dot ${
                      color === c.name ? "is-active" : ""
                    }`}
                    style={{ background: c.hex }}
                    onClick={() => setColor(c.name)}
                    title={c.name}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Talla */}
            <div className="kloe-pd-block">
              <span className="kloe-pd-label">
                Talla{" "}
                {sizeError && !size && (
                  <em className="kloe-pd-required">— elige una</em>
                )}
              </span>
              <div className="kloe-pd-sizes">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`kloe-size-btn ${size === s ? "is-active" : ""}`}
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="kloe-pd-block">
              <span className="kloe-pd-label">Cantidad</span>
              <div className="kloe-qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>

            {/* Acciones */}
            <div className="kloe-pd-actions">
              <button
                className="btn-kloe w-100"
                onClick={handleAdd}
                disabled={soldOut}
              >
                {soldOut ? "Agotado" : "Añadir al carrito"}
              </button>
              {!soldOut && (
                <button className="btn-kloe-outline w-100" onClick={handleBuyNow}>
                  Comprar ahora
                </button>
              )}
            </div>

            <ul className="kloe-pd-perks">
              <li>Envío gratis desde $999 MXN</li>
              <li>30 días para devoluciones</li>
              <li>Pago 100% seguro</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
