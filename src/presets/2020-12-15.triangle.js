import { defaults } from "./defaults";

import { pick } from "../utils/array";

import { stops as circularStops } from "../geometry/circle";

import { multiByScalar } from "../geometry/scale";
import { centroid } from "../geometry/vector";

const { PI } = Math;

const mapping = ["#E32DD355", "#BF3EFA55", "#672DE355"];

function* pointsGenerator(seed, width) {
  let points = multiByScalar(seed, width);
  let g = [gmetry(points)];
  let countG = 0;

  while (true) {
    yield g[countG];

    // calculo los gmetry en base a todos los hexagonos
    g[countG].triangles.forEach((trinity) => {
      g.push(gmetry(trinity));
    });

    countG++;
  }
}

const gmetry = (points) => {
  // console.log('gmetry points', points);

  const center = centroid(points);

  const triangles = [];

  for (let start = 0; start < points.length - 1; start++) {
    triangles.push([...points.slice(start, start + 2), center]);
  }
  triangles.push([points[points.length - 1], points[0], center]);

  // debugger;

  // const triangles = [
  //   [ points[0], points[1], center],
  //   [ points[1], points[2], center],
  //   [ points[2], points[0], center],
  // ];

  // console.log('gmetry triangles', ...triangles);

  return {
    points,
    center,
    triangles,
  };
};

const next = ((iterator) => (time) => iterator.next(time).value)(
  pointsGenerator(circularStops(12, 0.8), 500)
);

const preset = defaults([
  {
    painter: "XY4",
    next,
  },
]);

preset.background = "#000";
preset.frameRate = 30;

preset.setup = (canvas, global) => {
  canvas.rotate(PI / -2);
};

preset.draw = (context, time, canvas, global) => {
  // global.clear();
  canvas.clear();

  // if (time > 1) global.noLoop();

  context.forEach((local) => {
    const { points, triangles } = local.next(time);

    canvas.noFill();
    canvas.strokeWeight(1);

    triangles.forEach((hexa, index) => {
      canvas.stroke(pick(mapping, index));

      canvas.beginShape();
      hexa.forEach((p) => canvas.vertex(...p));
      canvas.endShape();
    });

    // // los puntos van al final para debugging
    // canvas.fill('white');
    // canvas.stroke('white');
    // canvas.ellipse(...center, 10);

    // points.forEach((p, i) => {
    //   canvas.fill(mapping[i]);
    //   canvas.stroke(mapping[i]);
    //   canvas.ellipse(...p, 10);
    // })
    // middles.forEach((p, i) => {
    //   canvas.fill(mapping[i]);
    //   canvas.stroke(mapping[i]);
    //   canvas.ellipse(...p, 10);
    // });
    // internal.forEach((p, i) => {
    //   canvas.fill(mapping[i]);
    //   canvas.stroke(mapping[i]);
    //   canvas.ellipse(...p, 10);
    // });
  });
};

export default preset;
