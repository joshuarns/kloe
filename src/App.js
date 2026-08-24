// ─────────────────────────────────────────────────────────────────────────────
// App.js — raíz de la aplicación: providers, layout y rutas.
// ─────────────────────────────────────────────────────────────────────────────

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Infraestructura (siempre cargada)
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import NavbarMenu from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Páginas (carga diferida)
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Contacto = lazy(() => import("./pages/Contacto"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return <div style={{ minHeight: "60vh" }} />;
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="kloe-app">
            <NavbarMenu />

            <main className="kloe-main">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tienda" element={<Shop />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}
