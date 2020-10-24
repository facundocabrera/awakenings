import { line_points } from "./line";

/**
 * Dado un conjunto de puntos, calcular todos los puntos intermedios de todas las lineas
 * que forman el contorno del poligono.
 *
 * @param {[ [x,y], ... ]} base Conjunto de puntos que forman el poligono (unitario).
 * @param {Number} orbita Numero de orbital.
 *
 * @returns [ [x, y], ... ]
 */
function fragment(base, orbita) {
  let vertex = [];

  for (let i = 0; i < base.length - 1; i++) {
    let points = line_points(
      ...base[i].map((v) => v * orbita),
      ...base[i + 1].map((v) => v * orbita)
    );

    if (i > 0) {
      points = points.slice(1);
    }

    vertex = [...vertex, ...points];
  }

  // 👁👁👁 Conectamos el ultimo punto con el primero
  vertex = [
    ...vertex,
    ...line_points(
      ...base[base.length - 1].map((v) => v * orbita),
      ...base[0].map((v) => v * orbita)
    ).slice(1, -1),
  ];

  return vertex;
}

export { fragment };
