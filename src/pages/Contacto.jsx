// pages/Contacto.jsx — formulario de contacto (demo, sin envío real)
import { Container, Row, Col, Form } from "react-bootstrap";
import { useToast } from "../context/ToastContext";
import { useSEO } from "../hooks/useSEO";

export default function Contacto() {
  useSEO({ title: "Contacto" });
  const { show } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    show("Mensaje enviado. ¡Gracias! (demo)", "success");
  };

  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col lg={7}>
          <p className="kloe-eyebrow text-center">Estamos para ayudarte</p>
          <h1 className="kloe-serif text-center mb-2" style={{ fontSize: "2.2rem" }}>
            Contacto
          </h1>
          <p className="text-center text-muted mb-4">
            ¿Dudas sobre tallas, envíos o un pedido? Escríbenos.
          </p>

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control as="textarea" rows={5} required />
                </Form.Group>
              </Col>
              <Col xs={12} className="text-center">
                <button type="submit" className="btn-kloe px-5">
                  Enviar mensaje
                </button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
