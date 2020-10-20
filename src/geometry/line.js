const { abs, sqrt, pow, atan, cos, sin, round } = Math;

// distancia entre 2 puntos en el plano
const distance = ( x1, y1, x2, y2 ) => {
  return sqrt( pow( x2 - x1 , 2) + pow( y2 - y1, 2 ) );
}

/**
 * Dado un segmento definido por `(x1, y1)` => `(x2, y2)` computar los puntos
 * que entran saltando `step` unidades.
 * 
 * @param step unidades que deseo avanzar
 * @param angle en RADIANES (si no lo pasamos, se calcula automaticamente en base a los puntos)
 */
const line_points = (x1, y1, x2, y2, step) => {
  const angle = atan((y2 - y1) / (x2 - x1));
    
  // 👁👁👁
  // 1. los puntos que manejo son siempre enteros
  // 2. los calculos tienen errores de decimales, de esta forma los corrijo
  const steps = round(distance(x1, y1, x2, y2) / step);
  const delta = round(step * cos(angle));
  const gamma = round(step * sin(angle));

  const points = [];

  for (let i = 0; i <= round(steps); i++) {
    const x = x1 + delta * i;
    const y = y1 + gamma * i;

    points.push([ x, y ]);
  }

  return points;
}

/**
 * Ecuacion de la recta que pasa por 2 puntos
 */
const line_equation_builder = (x1, y1, x2, y2) => {
  // pendiente
  const m = (y2 - y1) / (x2 - x1);
  // término independiente
  const b = y1 - m * x1;

  const y = x => m * x + b;
  y.m = m;
  y.b = b;

  return y;
}

export {
  distance,
  line_points,
  line_equation_builder
}
