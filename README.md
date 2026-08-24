# Kloe · Tienda de ropa (React)

Tienda de ropa online construida en React. Por ahora es **solo frontend** con
datos de ejemplo (mock); el backend, pagos y correos se conectan más adelante.

## Stack

- React 19 + react-scripts (CRA)
- react-router-dom 7 (rutas)
- react-bootstrap + Bootstrap 5 (UI)
- Estado del carrito con Context + useReducer, persistido en `localStorage`

## Arranque

```bash
npm install
npm start        # http://localhost:3000
```

Otros scripts:

```bash
npm run build    # build de producción en /build
npm test         # tests
```

## Estructura

```
src/
├── config/constants.js      Configuración e identidad de la tienda + formatPrice
├── data/products.js         Catálogo mock + API simulada (getProducts, getProductById)
├── context/
│   ├── CartContext.jsx      Carrito global (add/qty/remove/clear) + persistencia
│   └── ToastContext.jsx     Notificaciones flotantes
├── hooks/useSEO.js          Título y meta descripción por página
├── components/
│   ├── Navbar/              Barra de navegación + contador del carrito
│   ├── Footer/              Pie con newsletter (demo)
│   ├── ProductCard/         Tarjeta de prenda
│   └── ProductList/         Cuadrícula de tarjetas
└── pages/
    ├── Home.jsx             Hero, categorías, novedades
    ├── Shop.jsx             Catálogo con filtros (categoría/género/talla) y orden
    ├── ProductDetail.jsx    Ficha: galería, talla, color, cantidad
    ├── Cart.jsx             Carrito con resumen
    ├── Checkout.jsx         Checkout demo (sin cobro real)
    ├── Contacto.jsx         Formulario de contacto (demo)
    └── NotFound.jsx         404
```

## Rutas

| Ruta               | Página          |
| ------------------ | --------------- |
| `/`                | Inicio          |
| `/tienda`          | Catálogo        |
| `/producto/:id`    | Detalle prenda  |
| `/carrito`         | Carrito         |
| `/checkout`        | Pago (demo)     |
| `/contacto`        | Contacto        |

La tienda acepta filtros por query string, p. ej.
`/tienda?categoria=Vestidos&genero=Mujer&talla=M&orden=precio-asc`.

## Próximos pasos (backend)

Cuando se conecte el backend, basta con reemplazar `getProducts` / `getProductById`
en `data/products.js` por llamadas reales, y `handleSubmit` en `Checkout.jsx` por
la creación de la sesión de pago. El resto de la app no necesita cambios.
