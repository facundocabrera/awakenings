const { sqrt, pow, atan, acos } = Math;

// distancia entre 2 puntos en el plano
const distance = (x1, y1, x2, y2) => {
  const d = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

  return d;
};

// producto scalar entre 2 vectores
const dot_product = (x1, y1, x2, y2) => {
  const dp = x1 * x2 + y1 * y2;

  return dp;
};

// modulo de un vector
const modulo = (x, y) => {
  const d = distance(0, 0, x, y);

  return d;
};

// angulo entre 2 vectores
const angle_between = (x1, y1, x2, y2) => {
  const dp = dot_product(x1, y1, x2, y2);
  const m1 = modulo(x1, y1);
  const m2 = modulo(x2, y2);

  return acos(dp / (m1 * m2));
};

// la direccion de un vector esta dada por el angulo que forma la recta
// que une los 2 puntos y el eje X.
const direction = (x1, y1, x2, y2) => {
  const dy = y2 - y1;
  const dx = x2 - x1;

  return atan(dy / dx);
};

// Con esto traslado los puntos a un vector de radio 1, que me da la
// proporsion que necesito para marcar los puntos en la recta.
const unit_vector = (x, y) => {
  const m = modulo(x, y);

  return [x / m, y / m];
};

const middle_vector = (x1, y1, x2, y2) => {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
};

const sum = ([x, y], [z, t]) => [x + z, y + t];

const sumAll = (center, all) => all.map((v) => sum(v, center));

const mult = (vector, v) => vector.map((scalar) => scalar * v);

const mult_vector = (space2d, scalar) =>
  space2d.map(([x, y]) => [x * scalar, y * scalar]);

const sum_vector = (vector, init = [0, 0]) => vector.reduce(sum, [0, 0]);

const div = (vector, by) => vector.map((v) => v / by);

const centroid = (points) => div(sum_vector(points), points.length);

export {
  distance,
  dot_product,
  modulo,
  angle_between,
  direction,
  unit_vector,
  middle_vector,
  centroid,
  sum,
  sumAll,
  mult,
  mult_vector,
};
