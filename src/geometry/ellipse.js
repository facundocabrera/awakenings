// https://es.wikipedia.org/wiki/Elipse

import { stops } from './circle';
import { multiByScalar } from './scale';

/**
 * Calculate elliptical stops.
 * 
 * @param {Number} N Steps we want to calculate
 * @param {Number} height Ellipse height [0, 1]
 */
function ellipticStops(N, height = 1) {
  const outerStops = stops(N);
  const innerStops = multiByScalar(outerStops, height);

  // console.log(outerStops);
  // console.log(innerStops);

  // Now I have 2 circles, make the mapping
  const iterations = outerStops.length;

  const points = [];

  // for each stop, calculate the ellipse point
  for(let index = 0; index < iterations; index++) {
    const outer = outerStops[index];
    const inner = innerStops[index];

    // use x from outer, y from inner
    const x = outer[0];
    const y = inner[1];

    points.push([x, y]);
  }

  return points;
}

export {
  ellipticStops as stops
};