const { sqrt, pow, atan, cos, sin, round, acos } = Math;

// distancia entre 2 puntos en el plano
const distance = ( x1, y1, x2, y2 ) => {
  return sqrt( pow( x2 - x1 , 2) + pow( y2 - y1, 2 ) );
}

// producto scalar entre 2 vectores
const dotProduct = (x1, y1, x2, y2) => {
  return (x1 * x2 + y1 * y2);
}

// modulo de un vector
const modulo = (x, y) => distance(0, 0, x, y);

// angulo entre 2 vectores
const angleBetween = (x1, y1, x2, y2) => {
  return acos(dotProduct(x1, y1, x2, y2) / modulo(x1, y1) * modulo(x2, y2));
}

// la direccion de un vector esta dada por el angulo que forma la recta
// que une los 2 puntos y el eje X.
const direction = (x1, y1, x2, y2) => {
  return atan( (y2 - y1) / (x2 - x1) );
};

// Con esto traslado los puntos a un vector de radio 1, que me da la
// proporsion que necesito para marcar los puntos en la recta.
const unit_vector = (x, y) => {
  const m = modulo(x, y);

  return [ x / m, y / m ];
}

/**
 * Dado un segmento definido por `(x1, y1)` => `(x2, y2)` computar los puntos
 * que entran saltando `step` unidades.
 * 
 * @param step unidades que deseo avanzar
 * @param angle en RADIANES (si no lo pasamos, se calcula automaticamente en base a los puntos)
 */
const line_points = (x1, y1, x2, y2) => {
  // console.log('x1:', x1, 'y1:', y1);
  // console.log('x2:', x2, 'y2:', y2);

  const [ ux1, uy1 ] = unit_vector(x1, y1);
  const [ ux2, uy2 ] = unit_vector(x2, y2);

  const angle = angleBetween(ux1, uy1, ux2, uy2);
  const step = sqrt(2 - 2*cos(angle));

  const dx = (x2 - x1) < 0 ? -1 : 1;
  const dy = (y2 - y1) < 0 ? -1 : 1;

  // console.log('angle', angle, 'step', step);

  const steps = round(distance(x1, y1, x2, y2) / step);
  
  let incx = step * cos(direction(x1, y1, x2, y2));
  let incy = step * sin(direction(x1, y1, x2, y2));

  // 🧠 🧠 🧠
  // Esta correcion de signo fue lo mejor que se me ocurrio para
  // se armen correctamente los puntos dentro de los extremos
  // que estoy pasando de parametro.
  if (dx < 0 && incx > 0 || dx > 0 && incx < 0) {
    incx *= -1;
  }
  if (dy < 0 && incy > 0 || dy > 0 && incy < 0) {
    incy *= -1;
  }
  
  // console.log('incx', incx, 'incy', incy, 'dx', dx, 'dy', dy);

  const points = [];

  for (let i = 0; i <= steps; i++) {
    const x = x1 + incx * i;
    const y = y1 + incy * i;

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
