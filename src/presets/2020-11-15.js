import { Sequencer as BenfordSequencer } from "../machines/2020-11-05/sequencer";
import { Sequencer as FibonacciSequencer } from "../machines/fibonacci-machine";

import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";
import { dot_product } from "../geometry/vector";

import { defaults } from "./defaults";

const painter = "Machine";

const mapping = ["#FFFF3311", "#F400FF11", "#74E2FE11", "#7E3FFD11"];

const A = 27;
const RA = 270;

const B = 51;

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
  const p1p2 = dot_product(...p1, ...p2);

  const [from] = multiByScalar([p1], RA);

  canvas.noFill();
  canvas.stroke(mapping[time % mapping.length]);
  canvas.ellipse(...from, p1p2 * RA);
};

export default preset;
