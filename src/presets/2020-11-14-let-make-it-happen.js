const { PI } = Math;

import { Sequencer as FibonacciSequencer } from "../machines/fibonacci-machine";
import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";
import { centroid } from "../geometry/vector";
import { ratios } from "../math/fibonacci";

import { defaults } from "./defaults";

const painter = "XY4";
const color = "#FFFF3311";

const distances = ratios();

const A = 5;
const RA = 500;

const B = 5;
const RB = 300;

const preset = defaults([
  {
    painter,
    sequencer: FibonacciSequencer(A),
    points: stops(A),
  },
  {
    painter,
    sequencer: FibonacciSequencer(B),
    points: stops(B),
  },
]);

preset.background = "#000";
preset.frameRate = 30;

preset.setup = (canvas, global) => {
  // canvas.rotate(PI / -2);
};

preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  const [p1, p2] = context.map(({ sequencer, points }) => {
    const index = sequencer.next().value;
    const elPoint = points[index];

    return elPoint;
  });

  const [from] = multiByScalar([p1], RA);
  const [to] = multiByScalar([p2], RB);

  const [cx, cy] = centroid([from, to]);
  const [mx, my] = [cx, cy].map((v) => -1 * v);

  canvas.noFill();
  canvas.stroke(color);

  canvas.bezier(
    ...from,
    ...[cx, cy, mx, my].map(
      (v) => v * (1 - distances[time % distances.length])
    ),
    ...to
  );

  // canvas.rotate( PI * distances[ 0 ] );
};

export default preset;
