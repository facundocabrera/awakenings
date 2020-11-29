const { PI, sqrt } = Math;

import { EscaleraSequencer } from "../machines/escalera-machine";
import { Sequencer as BenfordWalkerN } from "../machines/2020-11-05/sequencer";
import { Sequencer as LogLogisticWalker } from "../machines/log-logistic-machine";
import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";
import { angle_between, centroid } from "../geometry/vector";

import { defaults } from "./defaults";

const mapping = ["#FFFF33", "#D7C0C4", "#F400FF"];

const builder = (base, radius, sequencer) => ({
  painter: "Machine",
  sequencer,
  points: stops(base),
  radius,
});

const pingpong = (width, height) => {
  const xd = 1;
  const yd = 1;

  const top = (-1 * height) / 2;
  const bottom = top * -1;

  const left = (-1 * width) / 2;
  const right = -1 * left;

  return ([x, y]) => {
    if (x < left) xd = 1;
    if (x > right) xd = -1;
    if (y < top) yd = 1;
    if (y > bottom) yd = -1;

    return [x * xd, y * yd];
  };
};

const base = 6;
const preset = defaults([
  builder(base, 100, LogLogisticWalker(1 / 7, 7, base)),
  builder(base, 100, EscaleraSequencer(base)),
]);
const ppp1 = pingpong(...preset.canvasSize);
const ppp2 = pingpong(...preset.canvasSize);

preset.background = "#000";
preset.frameRate = 60;

preset.center = () => [0, 0];

preset.setup = (canvas, global) => {
  // canvas.rotate(PI / 6);
};

preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  canvas.stroke(mapping[time % mapping.length]);

  let [p1, p2] = context
    .map(({ sequencer, points, radius }) => {
      const index = sequencer.next().value;
      const elPoint = points[index];

      return [elPoint, radius];
    })
    .map(([p, radius]) => {
      const [scaled] = multiByScalar([p], radius);

      return scaled;
    });

  p1 = ppp1(p1);
  p2 = ppp2(p2);

  const γ = angle_between(...p1, ...p2);

  // canvas.rotate(γ);
  canvas.line(...p1, ...p2);
  canvas.translate(...centroid([p1, p2]));
};

export default preset;
