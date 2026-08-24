// ─────────────────────────────────────────────────────────────────────────────
// hooks/useSEO.js
//
// Actualiza el <title> y la meta descripción del documento según la página
// actual. Sencillo pero suficiente para una SPA sin librería de SEO.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { STORE_NAME, STORE_TAGLINE } from "../config/constants";

export function useSEO({ title, description } = {}) {
  useEffect(() => {
    document.title = title
      ? `${title} · ${STORE_NAME}`
      : `${STORE_NAME} · ${STORE_TAGLINE}`;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
