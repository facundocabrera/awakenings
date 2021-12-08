/**
 * Hexagons / Migration from 2020-12-07.
 */
import { checkDrawable } from "../../qi/interfaces";

import { stops } from "../../geometry/circle";
import { multiByScalar } from "../../geometry/scale";
import { centroid } from "../../geometry/vector";
import { middle, middle_from } from "../../geometry/points";

const gmetry = (points) => {
  // calculo el centro del conjunto
  const center = centroid(points);

  // calculo los puntos medios entre los points
  const middles = middle(points);

  // calculo los puntos medios respecto al centro.
  const internal = middle_from(center, points);

  // ?
  const lines = [
    [middles[2], internal[3], middles[3], points[3]],
    [middles[4], internal[5], middles[5], points[5]],
    [middles[0], internal[1], middles[1], points[1]],
  ];

  // ?
  const axis = [
    [center, internal[0], points[0]],
    [center, internal[2], points[2]],
    [center, internal[4], points[4]],
  ];

  const faceCentroids = lines.map((l) => centroid(l));
  const crystals = [
    faceCentroids[1],
    faceCentroids[2],
    faceCentroids[0],
    middles[3],
    points[4],
    middles[4],
  ];

  const heart = centroid(crystals);

  const hexagons = [
    [points[4], middles[4], internal[5], center, internal[3], middles[3]],
    [internal[5], middles[5], points[0], middles[0], internal[1], center],
    [center, internal[1], middles[1], points[2], middles[2], internal[3]],
  ];

  return {
    points,
    center,
    middles,
    internal,
    lines,
    axis,
    crystals,
    heart,
    hexagons,
  };
};

function* recursion(seed, width) {
  let points = multiByScalar(seed, width);
  let g = [gmetry(points)];
  let countG = 0;

  while (true) {
    yield g[countG];

    // @TODO rewrite
    // calculo los gmetry en base a todos los hexagonos
    g[countG].hexagons.forEach((h) => {
      g.push(gmetry(h));
    });

    countG++;
  }
}

const DataProvider = (drawable) => {
  checkDrawable(drawable);

  let points = stops(6);
  let space = 500;
  let it;

  const setup = (props) => {
    it = recursion(points, space);

    drawable.setup(props);
  };

  const draw = (props) => {
    drawable.draw({
      ...props,
      ...it.next().value,
    });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export { DataProvider };
