// https://es.wikipedia.org/wiki/Elipse

import { stops } from './circle';
import { multiByScalar } from './scale';

import { omnitrix } from './omnitrix';

function ellipticStops(N, height = 1) {
  const outerStops = stops(N);
  const innerStops = multiByScalar(outerStops, height);

  return omnitrix(outerStops, innerStops);
}

export {
  ellipticStops as stops
};