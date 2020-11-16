import { Sequencer as FibonacciSequencer } from "../machines/fibonacci-machine";

import { stops } from "../geometry/circle";
import { dot_product, angle_between, direction } from "../geometry/vector";

import { defaults } from "./defaults";

const painter = "Machine";

const mapping = ["#FFFF3311", "#F400FF11", "#74E2FE11", "#7E3FFD11"];

const A = 11;
const B = 13;

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
preset.frameRate = 60;

preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  const [p1, p2] = context.map(({ sequencer, points }) => {
    const index = sequencer.next().value;
    const elPoint = points[index];

    return elPoint;
  });
  const p1p2 = dot_product(...p1, ...p2);

  canvas.fill(mapping[time % mapping.length]);
  canvas.stroke(mapping[time % mapping.length]);

  canvas.arc(0, 0, p1p2 * 700, p1p2 * 700, 0, direction(...p1, ...p2));
  canvas.arc(0, 0, p1p2 * 700, p1p2 * 700, 0, angle_between(...p1, ...p2));
};

export default preset;
