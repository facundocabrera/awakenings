const { PI, sqrt } = Math;

import { Sequencer } from "../machines/log-logistic-machine";
import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";
import { angle_between } from "../geometry/vector";
import { ratios } from "../math/fibonacci";

import { defaults } from "./defaults";

const mapping = [
  "#FFFF3311",
  "#D7C0C411",
  "#F400FF11",
];

const builder = (α, β, base, color, radius) => ({
  painter: "Machine",
  base,
  sequencer: Sequencer(α, β, base),
  points: stops(base),
  color,
  radius
});

const preset = defaults([
  // builder(0.1, 2, 3, "#FFFF33", 300),
  // builder(0.5, 8, 6, "#FFFF33", 500),
  // builder(0.1, 8, 4, "#FFFF33", 300),
  // builder(0.5, 0.2, 8, "#FFFF33", 500),
  // builder(1/7, 1/21, 3, "#FFFF33", 300),
  // builder(1/3, 1/23, 5, "#FFFF33", 500),
  builder(1, sqrt(3), 3, "#FFFF33", 300),
  builder(1, sqrt(5), 5, "#FFFF33", 500),
]);

preset.background = "#000";
preset.frameRate = 60;

preset.setup = (canvas, global) => {
  // canvas.rotate(PI / 6);
};

preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  canvas.stroke(mapping[ time % mapping.length ]);
  // canvas.fill(context[0].color);

  const [p1, p2] = context.map(({ sequencer, points, radius }) => {
    const index = sequencer.next().value;
    const elPoint = points[index];

    return [elPoint, radius];
  }).map(([ p, radius ]) => {
    const [scaled] = multiByScalar([p], radius);

    return scaled;
  });

  const γ = angle_between(...p1, ...p2);

  canvas.rotate(γ);
  canvas.line(...p1, ...p2);
};

export default preset;