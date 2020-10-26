const { sqrt, cos, sin, round } = Math;

import {  
  angle_between,
  unit_vector,
  distance,
  direction
} from './vector';

/**
 * Dado un segmento definido por `(x1, y1)` => `(x2, y2)` computar los puntos
 * que entran saltando `step` unidades.
 *
 * @param step unidades que deseo avanzar
 * @param angle en RADIANES (si no lo pasamos, se calcula automaticamente en base a los puntos)
 */
const line_points = (x1, y1, x2, y2) => {
  const [ux1, uy1] = unit_vector(x1, y1);
  const [ux2, uy2] = unit_vector(x2, y2);

  const angle = angle_between(ux1, uy1, ux2, uy2);
  // teorema del coseno simplificado por el uso de vectores unitarios
  const step = sqrt(2 - 2 * cos(angle)); 

  const dx = x2 - x1 < 0 ? -1 : 1;
  const dy = y2 - y1 < 0 ? -1 : 1;

  const steps = round(distance(x1, y1, x2, y2) / step);

  let incx = step * cos(direction(x1, y1, x2, y2));
  let incy = step * sin(direction(x1, y1, x2, y2));

  // 🧠 🧠 🧠
  // Esta correcion de signo fue lo mejor que se me ocurrio para
  // se armen correctamente los puntos dentro de los extremos
  // que estoy pasando de parametro.
  if ((dx < 0 && incx > 0) || (dx > 0 && incx < 0)) {
    incx *= -1;
  }
  if ((dy < 0 && incy > 0) || (dy > 0 && incy < 0)) {
    incy *= -1;
  }

  const points = [];

  for (let i = 0; i <= steps; i++) {
    const x = x1 + incx * i;
    const y = y1 + incy * i;

    points.push([x, y]);
  }

  return points;
};

/**
 * Ecuacion de la recta que pasa por 2 puntos
 */
const line_equation_builder = (x1, y1, x2, y2) => {
  // pendiente
  const m = (y2 - y1) / (x2 - x1);
  // término independiente
  const b = y1 - m * x1;

  const y = (x) => m * x + b;
  y.m = m;
  y.b = b;

  return y;
};

export { line_points, line_equation_builder };
