//
// @TODO remove this code the current impl is better and
//       and prevent rounding problems found when I defined
//       stops > 300.
//
// export function stops(N, shift = 0) {
//   const step = 360 / N;
//   let arc = 0;

//   const points = [];

//   while (arc < 360) {
//     const shifted = arc + shift;

//     points.push([
//       Number(cos(unit(shifted, "deg"))),
//       Number(sin(unit(shifted, "deg"))),
//     ]);
//     arc += step;
//   }

//   return points;
// }

/**
 * Calculos los puntos (x,y) para armar un poligono que tenga N vertices equidistantes.
 *
 * @param {Integer} N Vertices alrededor de una circunferencia de radio 1.
 * @param {Integer} shift Angulo de desplazamiento.
 *
 * @return [ [x, y], [x, y], ... ]
 */
export function stops(numberOfPoints, shift = 0) {
  const vector = Array(numberOfPoints);
  const start = shift;
  const step = (2 * Math.PI) / numberOfPoints;

  let angle = start;
  for (let i = 0; i < numberOfPoints; i++) {
    vector[i] = [Math.cos(angle), Math.sin(angle)];
    angle += step;
  }

  return vector;
}

export function vector_around(
  radius = 1,
  perimeter = 2 * Math.PI,
  numberOfPoints,
  shift = 0
) {
  const vector = Array(numberOfPoints);
  const start = shift;
  const step = perimeter / numberOfPoints;

  let angle = start;
  for (let i = 0; i < numberOfPoints; i++) {
    vector[i] = [radius * Math.cos(angle), radius * Math.sin(angle)];
    angle += step;
  }

  return vector;
}
