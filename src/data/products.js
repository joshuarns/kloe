// ─────────────────────────────────────────────────────────────────────────────
// data/products.js
//
// Catálogo de ejemplo (mock). Mientras no haya backend, la tienda lee de aquí.
// Cuando conectemos el backend real, basta con reemplazar `getProducts` /
// `getProductById` por llamadas a la API — el resto de la app no cambia.
//
// Cada prenda tiene:
//   id          → identificador único (usado en la URL /producto/:id)
//   name        → nombre visible
//   category    → una de las CATEGORIES de abajo
//   gender      → "Mujer" | "Hombre" | "Unisex"
//   price       → precio actual en MXN
//   compareAt   → precio anterior (para mostrar descuento); null si no aplica
//   sizes       → tallas disponibles
//   colors      → colores disponibles (nombre + hex para el swatch)
//   images      → array de URLs (la primera es la principal)
//   description → texto para la página de detalle
//   isNew       → true = badge "Nuevo"
//   stock       → unidades totales (0 = agotado)
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Camisetas",
  "Camisas",
  "Pantalones",
  "Vestidos",
  "Sudaderas",
  "Chaquetas",
  "Accesorios",
];

export const GENDERS = ["Mujer", "Hombre", "Unisex"];

export const ALL_SIZES = ["XS", "S", "M", "L", "XL", "Única"];

// Helper: genera una imagen de marcador de posición estable por semilla.
// Reemplazar por URLs reales cuando haya fotos de producto.
const img = (seed) => `https://picsum.photos/seed/${seed}/600/800`;

const PRODUCTS = [
  {
    id: "camiseta-algodon-blanca",
    name: "Camiseta de algodón orgánico",
    category: "Camisetas",
    gender: "Unisex",
    price: 349,
    compareAt: 449,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blanco", hex: "#f5f5f5" },
      { name: "Negro", hex: "#1a1a1a" },
      { name: "Arena", hex: "#d8c9b0" },
    ],
    images: [img("kloe-tee-1"), img("kloe-tee-1b"), img("kloe-tee-1c")],
    description:
      "Corte relajado en algodón 100% orgánico. Una prenda base que combina con todo, suave al tacto y pensada para durar temporada tras temporada.",
    isNew: true,
    stock: 40,
  },
  {
    id: "camisa-lino-beige",
    name: "Camisa de lino manga larga",
    category: "Camisas",
    gender: "Hombre",
    price: 799,
    compareAt: null,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Beige", hex: "#d8c9b0" },
      { name: "Azul cielo", hex: "#a7c7e7" },
    ],
    images: [img("kloe-shirt-1"), img("kloe-shirt-1b")],
    description:
      "Lino fresco y transpirable, ideal para climas cálidos. Botones de nácar y un corte que cae bien tanto por dentro como por fuera del pantalón.",
    isNew: false,
    stock: 22,
  },
  {
    id: "vestido-midi-floral",
    name: "Vestido midi estampado",
    category: "Vestidos",
    gender: "Mujer",
    price: 1099,
    compareAt: 1399,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Floral", hex: "#c98a9a" },
      { name: "Negro", hex: "#1a1a1a" },
    ],
    images: [img("kloe-dress-1"), img("kloe-dress-1b"), img("kloe-dress-1c")],
    description:
      "Vuelo ligero hasta media pierna con estampado exclusivo de temporada. Tejido fluido con forro interior y cierre lateral invisible.",
    isNew: true,
    stock: 15,
  },
  {
    id: "pantalon-chino-verde",
    name: "Pantalón chino slim",
    category: "Pantalones",
    gender: "Hombre",
    price: 899,
    compareAt: null,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Verde oliva", hex: "#6b6b3a" },
      { name: "Camel", hex: "#c19a6b" },
      { name: "Marino", hex: "#26364d" },
    ],
    images: [img("kloe-pants-1"), img("kloe-pants-1b")],
    description:
      "Corte slim con algo de elastano para libertad de movimiento. Versátil para la oficina o el fin de semana.",
    isNew: false,
    stock: 30,
  },
  {
    id: "sudadera-oversize-gris",
    name: "Sudadera oversize",
    category: "Sudaderas",
    gender: "Unisex",
    price: 749,
    compareAt: 949,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Gris jaspe", hex: "#b8b8b8" },
      { name: "Negro", hex: "#1a1a1a" },
      { name: "Crema", hex: "#efe7d6" },
    ],
    images: [img("kloe-hoodie-1"), img("kloe-hoodie-1b")],
    description:
      "Felpa gruesa por dentro, hombros caídos y capucha forrada. El punto medio perfecto entre comodidad y estilo.",
    isNew: false,
    stock: 25,
  },
  {
    id: "chaqueta-denim",
    name: "Chaqueta de mezclilla",
    category: "Chaquetas",
    gender: "Mujer",
    price: 1249,
    compareAt: null,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Azul lavado", hex: "#7a95b3" },
      { name: "Negro", hex: "#1a1a1a" },
    ],
    images: [img("kloe-jacket-1"), img("kloe-jacket-1b")],
    description:
      "Un clásico atemporal en mezclilla de peso medio. Botonadura metálica y bolsillos frontales. Combínala sobre casi cualquier look.",
    isNew: true,
    stock: 18,
  },
  {
    id: "camiseta-rayas",
    name: "Camiseta a rayas",
    category: "Camisetas",
    gender: "Mujer",
    price: 399,
    compareAt: null,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Marino/Blanco", hex: "#26364d" },
      { name: "Rojo/Blanco", hex: "#b23b3b" },
    ],
    images: [img("kloe-tee-2"), img("kloe-tee-2b")],
    description:
      "Rayas marineras en punto suave. Un básico con carácter que nunca pasa de moda.",
    isNew: false,
    stock: 35,
  },
  {
    id: "pantalon-palazzo",
    name: "Pantalón palazzo fluido",
    category: "Pantalones",
    gender: "Mujer",
    price: 949,
    compareAt: 1199,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Negro", hex: "#1a1a1a" },
      { name: "Terracota", hex: "#b5651d" },
    ],
    images: [img("kloe-pants-2"), img("kloe-pants-2b")],
    description:
      "Pierna ancha y cintura alta con caída elegante. Comodidad total con un aire sofisticado.",
    isNew: false,
    stock: 20,
  },
  {
    id: "gorra-clasica",
    name: "Gorra clásica bordada",
    category: "Accesorios",
    gender: "Unisex",
    price: 299,
    compareAt: null,
    sizes: ["Única"],
    colors: [
      { name: "Negro", hex: "#1a1a1a" },
      { name: "Beige", hex: "#d8c9b0" },
      { name: "Marino", hex: "#26364d" },
    ],
    images: [img("kloe-cap-1")],
    description:
      "Gorra de sarga de algodón con cierre ajustable y logo bordado. El toque final para cualquier look casual.",
    isNew: false,
    stock: 50,
  },
  {
    id: "camisa-oversize-mujer",
    name: "Camisa oversize de popelina",
    category: "Camisas",
    gender: "Mujer",
    price: 699,
    compareAt: null,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Blanco", hex: "#f5f5f5" },
      { name: "Rayas azules", hex: "#a7c7e7" },
    ],
    images: [img("kloe-shirt-2"), img("kloe-shirt-2b")],
    description:
      "Popelina crujiente con corte holgado. Úsala abierta sobre una camiseta o cerrada como blusa.",
    isNew: true,
    stock: 28,
  },
  {
    id: "vestido-tirantes-negro",
    name: "Vestido de tirantes",
    category: "Vestidos",
    gender: "Mujer",
    price: 849,
    compareAt: null,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Negro", hex: "#1a1a1a" },
      { name: "Vino", hex: "#722f37" },
    ],
    images: [img("kloe-dress-2"), img("kloe-dress-2b")],
    description:
      "Silueta ajustada en punto elástico. Minimalista y versátil: perfecto solo o combinado con capas.",
    isNew: false,
    stock: 0,
  },
  {
    id: "chaqueta-bomber",
    name: "Chaqueta bomber",
    category: "Chaquetas",
    gender: "Hombre",
    price: 1349,
    compareAt: 1599,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Negro", hex: "#1a1a1a" },
      { name: "Verde militar", hex: "#4b5320" },
    ],
    images: [img("kloe-jacket-2"), img("kloe-jacket-2b")],
    description:
      "Bomber ligera con puños y cintura elásticos. Un imprescindible de entretiempo con acabados premium.",
    isNew: true,
    stock: 16,
  },
];

// ── API mock ─────────────────────────────────────────────────────────────────
// Simulan las llamadas asíncronas que hará el backend real. Devuelven promesas
// para que las páginas ya estén escritas pensando en datos que llegan con delay.

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getProducts() {
  await delay(200);
  return PRODUCTS;
}

export async function getProductById(id) {
  await delay(150);
  return PRODUCTS.find((p) => p.id === id) || null;
}

export function getProductByIdSync(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

export default PRODUCTS;
