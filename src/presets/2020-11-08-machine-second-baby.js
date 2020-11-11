import { Sequencer } from "../machines/2020-11-10/sequencer";
import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";

import { defaults } from "./defaults";

const length = 10;

// Divido el circulo en 6 puntos que son los movimientos que puedo hacer
const base = 6;
const points = stops(base);
// Elijo EL movimiento
const success = 1;
// La probabilidad de elegir la correcta es
const prob = 1 / base;

const sequencer = Sequencer(base, success, prob, base);

const painter = "Machine";
const color = "#FFFF3333";

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
preset.frameRate = 30;

let last;

preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  context.forEach(({ color, sequencer, points }) => {
    if (!last) {
      last = sequencer.next().value;
      return;
    }
    let current = sequencer.next().value;

    const [from, to] = multiByScalar([points[last], points[current]], length);

    canvas.stroke(color);
    canvas.line(...from, ...to);

    canvas.translate(...to);

    last = current;
  });
};

export default preset;
