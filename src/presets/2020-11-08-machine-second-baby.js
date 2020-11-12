const { PI, log } = Math;

import { Sequencer } from "../machines/2020-11-10/sequencer";
import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";

import { defaults } from "./defaults";
import { centroid } from "../geometry/vector";

const length = 50;

// Divido el circulo en 6 puntos que son los movimientos que puedo hacer
const base = 8;
const points = stops(base);
const center = centroid(points);

// La probabilidad de elegir la correcta es
const prob = 1/8;

const sequencer = Sequencer(base, prob);

const painter = "Machine";
const color = "#FFFF3355";

const preset = defaults([
  {
    painter,
    color,
    base,
    sequencer,
    points,
  },
]);

preset.background = "#000";
preset.frameRate = 60;

let last;

preset.setup = (canvas, global) => {
  canvas.rotate(PI / base);
};

preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  context.forEach(({ color, sequencer, points }) => {
    if (!last) {
      last = sequencer.next().value;
      return;
    }
    let current = sequencer.next().value;

    let p1 = points[last];
    let p2 = points[current];

    if (last === current) {
      p2 = center;
    }

    const [from, to] = multiByScalar([p1, p2], length);

    canvas.stroke(color);
    canvas.line(...from, ...to);
    canvas.translate(...to);

    last = current;
  });
};

export default preset;
