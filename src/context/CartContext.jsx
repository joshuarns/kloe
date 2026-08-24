// ─────────────────────────────────────────────────────────────────────────────
// context/CartContext.jsx
//
// Estado global del carrito de compra. Persiste en localStorage para que el
// carrito sobreviva a recargas de página.
//
// Una "línea" del carrito se identifica por la combinación producto+talla+color,
// porque la misma prenda en dos tallas distintas son dos líneas separadas.
// ─────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { CART_STORAGE_KEY } from "../config/constants";

const CartContext = createContext(null);

// Clave única de una línea = producto + talla + color
const lineKey = (id, size, color) => `${id}::${size}::${color}`;

function readInitialState() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, size, color, qty } = action;
      const key = lineKey(product.id, size, color);
      const existing = state.items.find((it) => it.key === key);

      if (existing) {
        return {
          items: state.items.map((it) =>
            it.key === key ? { ...it, qty: it.qty + qty } : it
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            key,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] ?? "",
            size,
            color,
            qty,
          },
        ],
      };
    }

    case "SET_QTY": {
      const qty = Math.max(1, action.qty);
      return {
        items: state.items.map((it) =>
          it.key === action.key ? { ...it, qty } : it
        ),
      };
    }

    case "REMOVE":
      return { items: state.items.filter((it) => it.key !== action.key) };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, readInitialState);

  // Persistir cada cambio en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* almacenamiento lleno o no disponible: ignoramos */
    }
  }, [state]);

  const value = useMemo(() => {
    const totalItems = state.items.reduce((sum, it) => sum + it.qty, 0);
    const subtotal = state.items.reduce(
      (sum, it) => sum + it.price * it.qty,
      0
    );

    return {
      items: state.items,
      totalItems,
      subtotal,
      addItem: (product, { size, color, qty = 1 }) =>
        dispatch({ type: "ADD", product, size, color, qty }),
      setQty: (key, qty) => dispatch({ type: "SET_QTY", key, qty }),
      removeItem: (key) => dispatch({ type: "REMOVE", key }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
