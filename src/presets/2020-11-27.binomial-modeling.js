import { defaults } from "./defaults";

import { build, prob as toProbabilities, angles as toAngles } from "../models/binomial/model-binomial";

import { pick } from "../utils/array";
import { sin, cos } from "mathjs";

const { PI } = Math;

const mapping = [
  "#D2B97D",
  "#F5AE2A",
  "#F6732D",
  "#F84132",
  "#A71A62",
  "#197399",
  "#1B4D79",
];

const entry = (setSize, w, h) => {
  const bell = build(setSize);
  const prob = toProbabilities(bell);
  const angles = toAngles(prob);

  return {
    painter: "XY4",
    bell,
    prob,
    angles,
    w, 
    h
  }
}

const fn = (radius, steps, f) => time => radius * f(PI / steps * time);
const fnConstant = (radius) => () => radius;

const preset = defaults([
  entry(8, fnConstant(150), fnConstant(150)),
  entry(8, fnConstant(300), fnConstant(300)),
  entry(8, fnConstant(450), fnConstant(450)),
  entry(8, fnConstant(550), fnConstant(550)),
  // entry(8, fn(450, 16, cos), fn(450, 16, sin)),
]);

preset.background = "#000";
preset.frameRate = 5;

preset.setup = (canvas, global) => {};

const plot = (canvas, angles, time, w, h, color) => {
  const α = pick(angles, time);

  canvas.noFill();
  canvas.stroke(color);
  canvas.strokeWeight(10);
  
  canvas.rotate(PI / 16);
  canvas.arc(0, 0, w(time), h(time), 2 * PI - α, 0);
}

preset.draw = (context, time, canvas, global) => {
  global.clear();
  canvas.clear();

  const c = (a) => {
    const col = global.color(pick(mapping, time));
    col.setAlpha(a);
    return col;
  };

  context.forEach(({ angles, w, h }) => plot(canvas, angles, time, w, h, c(235)));
  context.forEach(({ angles, w, h }) => plot(canvas, angles, time + 1, w, h, c(175)));
  context.forEach(({ angles, w, h }) => plot(canvas, angles, time + 2, w, h, c(90)));
};

export default preset;
