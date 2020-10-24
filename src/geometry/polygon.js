import { stops } from "../geometry/circle";
import { fragment } from "../geometry/points";

/**
 * Generador de poligonos regulares.
 *
 * @param {Number} vertices Numero de vertices que necesito.
 * @param {Number} orbita Orbita que me interesa ver.
 *
 * @returns [[x,y], ...]
 */
function polygon(vertices = 3, orbita = 1) {
  // Set of base points
  const base = stops(vertices);

  // Expanded set of points given the orbita
  const expanded = orbita > 1 ? fragment(base, orbita) : base;

  return expanded;
}

export { polygon };
