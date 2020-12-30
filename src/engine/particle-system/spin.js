import { pick } from "../../utils/array";
import { stops } from "../../geometry/circle";

import { distance, sum } from "../../geometry/vector";

import { multiByScalar } from "../../geometry/scale";

function Spin(mass, steps) {
  const rotation = multiByScalar(stops(steps), mass);
  let i = 0;

  const mutation = (particles) => {
    const [m, n] = pick(rotation, i);

    for (let idx = 0; idx < particles.length; idx++) {
      const [x, y] = particles[idx].position;

      particles[idx].position = [x + n, y + m];
    }

    i++;
  };

  return mutation;
}

function RelativeSpin(centroid, mass, steps, direction = 1) {
  const vectorField = multiByScalar(stops(steps), mass)
    .map((p) => sum(centroid, p))
    .map(([x, y]) => [y, -1 * x]);
  let current = 0;

  const mutation = (particles) => {
    const [m, n] = pick(vectorField, current);

    for (let idx = 0; idx < particles.length; idx++) {
      const [x, y] = particles[idx].position;

      const d = distance(x, y, m, n);

      particles[idx].position = sum([x, y], [(m * 1) / d, (n * 1) / d]);
    }

    current += direction;
  };

  return mutation;
}

export { Spin, RelativeSpin };
