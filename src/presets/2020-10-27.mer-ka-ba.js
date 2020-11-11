const { PI, sqrt, pow } = Math;

import range from "lodash/range";

import { defaults } from "./defaults";

import { multiByScalar } from "../geometry/scale";
import { polygon } from "../geometry/polygon";

const unity = 350;

// Longitud del conjunto.
const l = (n) => 2 * n;

// Range de valores del conjunto.
const r = (n) => range(l(n - 1) + 1, l(n));

// Generador de la secuencia.
const seq = (n) => Math.round(n / pow(n, 1 / 2));

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  return [unity / seq(t), unity / seq(t), unity, unity];
}

const mapping = [
  "#D2B97D11",
  "#F5AE2A11",
  "#F6732D11",
  "#F8413211",
  "#A71A6211",
  "#19739911",
  "#1B4D7911",
];

const preset = defaults([
  {
    painter: "XY4",
    fn: pointAtom,
    color: "#FAC328",
  },
]);

preset.background = "#000";
preset.frameRate = 60;
preset.time = 1;
preset.setup = (canvas, global) => {};

const plot = (vertex, time, context, canvas, global) => {
  canvas.noFill();
  canvas.stroke(mapping[time % mapping.length]);

  canvas.rotate((PI / seq(time)) * Math.exp(1 / seq(time)));
  canvas.line(...vertex);
};

// preset.canvasSize = preset.canvasSize.map(v => v * 4);
preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  context.forEach((local) => {
    plot(local.fn(time), time, local, canvas, global);
  });
};

export default preset;
