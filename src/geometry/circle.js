import { cos, sin, unit } from "mathjs";

/**
 * Calculos los puntos (x,y) para armar un poligono que tenga N vertices equidistantes.
 *
 * @param {Integer} N Vertices alrededor de una circunferencia de radio 1.
 * @param {Integer} shift Angulo de desplazamiento.
 *
 * @return [ [x, y], [x, y], ... ]
 */
function stops(N, shift = 0) {
  const step = 360 / N;
  let arc = 0;

  const points = [];

  while (arc < 360) {
    const shifted = arc + shift;

    points.push([
      Number(cos(unit(shifted, "deg")).toFixed(3)),
      Number(sin(unit(shifted, "deg")).toFixed(3)),
    ]);
    arc += step;
  }

  return points;
}

export { stops };
