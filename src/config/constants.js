// ─────────────────────────────────────────────────────────────────────────────
// config/constants.js
//
// Valores de configuración centralizados. Cámbialos aquí y se propagan a toda
// la app — evita tener strings mágicos repartidos por los componentes.
// ─────────────────────────────────────────────────────────────────────────────

// Identidad de la tienda
export const STORE_NAME = "Kloe";
export const STORE_TAGLINE = "Ropa con estilo";

// Moneda usada para formatear precios
export const CURRENCY = "MXN";
export const LOCALE = "es-MX";

// Umbral de envío gratis (en la misma moneda que los precios)
export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_COST = 99;

// Clave de localStorage donde se persiste el carrito
export const CART_STORAGE_KEY = "kloe_cart_v1";

// Formatea un número como precio con la moneda de la tienda.
export function formatPrice(value) {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
