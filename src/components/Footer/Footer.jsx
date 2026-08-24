// components/Footer/Footer.jsx — pie de página con enlaces y newsletter (mock)
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { STORE_NAME, STORE_TAGLINE } from "../../config/constants";
import { CATEGORIES } from "../../data/products";
import "./Footer.css";

export default function Footer() {
  const { show } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    show("¡Gracias por suscribirte! (demo)", "success");
  };

  return (
    <footer className="kloe-footer">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <div className="kloe-footer-brand kloe-serif">{STORE_NAME}</div>
            <p className="kloe-footer-tag">{STORE_TAGLINE}</p>
            <p className="kloe-footer-note">
              Prendas seleccionadas con cariño. Envíos a todo México.
            </p>
          </Col>

          <Col xs={6} md={2}>
            <h6 className="kloe-footer-title">Tienda</h6>
            <ul className="kloe-footer-list">
              <li>
                <Link to="/tienda">Todo</Link>
              </li>
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat}>
                  <Link to={`/tienda?categoria=${encodeURIComponent(cat)}`}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={6} md={2}>
            <h6 className="kloe-footer-title">Ayuda</h6>
            <ul className="kloe-footer-list">
              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
              <li>
                <Link to="/tienda">Guía de tallas</Link>
              </li>
              <li>
                <Link to="/tienda">Envíos y devoluciones</Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="kloe-footer-title">Newsletter</h6>
            <p className="kloe-footer-note">
              Suscríbete y recibe 10% en tu primera compra.
            </p>
            <form className="kloe-footer-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                placeholder="Tu correo"
                aria-label="Correo electrónico"
              />
              <button type="submit" className="btn-kloe">
                Suscribir
              </button>
            </form>
          </Col>
        </Row>

        <div className="kloe-footer-bottom">
          <span>
            © {new Date().getFullYear()} {STORE_NAME}. Todos los derechos
            reservados.
          </span>
          <span className="kloe-footer-legal">
            <Link to="/tienda">Aviso de privacidad</Link>
            <Link to="/tienda">Términos</Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}
