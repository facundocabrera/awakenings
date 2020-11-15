import { Sequencer as BenfordSequencer } from "../machines/2020-11-05/sequencer";
import { Sequencer as FibonacciSequencer } from "../machines/fibonacci-machine";

import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";
import { centroid, distance } from "../geometry/vector";
import { ratios } from "../math/fibonacci";

import { defaults } from "./defaults";

const painter = "Machine";

const mapping = ["#FFFF3311", "#F400FF11", "#74E2FE11", "#7E3FFD11"];

const distances = ratios();

const A = 27;
const RA = 500;

const B = 51;
const RB = 150;

const preset = defaults([
  {
    painter,
    sequencer: BenfordSequencer(A),
    points: stops(A),
  },
  {
    painter,
    sequencer: FibonacciSequencer(B),
    points: stops(B),
  },
]);

preset.background = "#000";
preset.frameRate = 60;

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
  canvas.stroke(mapping[time % mapping.length]);
  canvas.ellipse(
    ...from,
    distance(...from, ...to) * (1 - distances[time % distances.length])
  );
  canvas.ellipse(
    ...to,
    distance(...from, ...to) * (1 - distances[time % distances.length])
  );
};

export default preset;
