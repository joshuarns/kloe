// pages/NotFound.jsx — 404
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

export default function NotFound() {
  useSEO({ title: "Página no encontrada" });
  return (
    <Container className="py-5 text-center" style={{ minHeight: "55vh" }}>
      <p className="kloe-eyebrow">Error 404</p>
      <h1 className="kloe-serif" style={{ fontSize: "3rem" }}>
        Página no encontrada
      </h1>
      <p className="text-muted">La página que buscas no existe o se movió.</p>
      <Link to="/" className="btn-kloe mt-2 d-inline-block">
        Volver al inicio
      </Link>
    </Container>
  );
}
