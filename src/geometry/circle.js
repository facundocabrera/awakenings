import { cos, sin, unit }  from "mathjs";

/**
 * Calculos los puntos (x,y) para armar un poligono que tenga N vertices equidistantes.
 * 
 * @param {Integer} n Numero de vertices alrededor de una circunferencia de radio 1.
 * 
 * @return Array de puntos en formato [x, y]
 */
function stops(N) {
  const step = 360 / N;
  let arc = 0;

  const points = [];

  while( arc < 360 ) {
    points.push([ 1*cos(unit(arc, 'deg')).toFixed(3), 1*sin(unit(arc, 'deg')).toFixed(3) ]);
    arc += step;
  }

  return points;
}

export {
  stops,
};