const { PI } = Math;

import { Sequencer } from "../machines/2020-11-10/sequencer";
import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";
import { centroid } from "../geometry/vector";
import { ratios } from "../math/fibonacci";

import { defaults } from "./defaults";

const painter = "Machine";
const color = "#FFFF3311";

const distances = ratios();

const A = 5;
const PA = distances[2];
const RA = 500;

const B = 6;
const PB = 1 - PA;
const RB = RA;

const preset = defaults([
  {
    painter,
    base: A,
    sequencer: Sequencer(A, PA),
    points: stops(A),
  },
  {
    painter,
    base: B,
    sequencer: Sequencer(B, PB),
    points: stops(B),
  },
]);

preset.background = "#000";
preset.frameRate = 60;

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
    ...[cx, cy].map((v) => v * (1 - distances[2])),
    ...[mx, my].map((v) => v * (1 - distances[2])),
    ...to
  );

  canvas.rotate(PI * distances[time % distances.length]);
  // cx, cy, mx, my
  // canvas.bezier(...from, cx, cy, mx, my, ...to);
  // mx, my, cx, cy,
  // canvas.bezier(...from, mx, my, cx, cy, ...to);

  // // cx, my, cx, cy
  // canvas.bezier(...from, cx, my, cx, cy, ...to);
  // // cx, cy, cx, my
  // canvas.bezier(...from, cx, cy, cx, my, ...to);
};

export default preset;
