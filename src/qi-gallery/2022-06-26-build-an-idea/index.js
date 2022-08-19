import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

import { DataProvider } from "./data";

import { random } from "../../utils/random";

const View = (color, fill) => {
  let ui;
  let origin;

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;
  };

  const draw = ({ dt, samples, trinity }) => {
    ui.clear();
    ui.background(0);

    ui.push();

    ui.translate(...origin);

    ui.strokeWeight(4);
    ui.noFill();

    [...samples, trinity].forEach((element) => {
      const [x, y] = [Math.cos(element), Math.sin(element)];

      const r = random(0.25, 1);
      const from = ui.color(255, 0, 0, 255);
      const to = ui.color(0, 0, 255, 255);
      const color = ui.lerpColor(from, to, r);

      ui.stroke(color);
      ui.ellipse(x, y, 700 * r);
    });

    ui.pop();
  };

  return {
    name: "View",
    setup,
    draw,
  };
};

const frameRate = 16;
const canvasSize = [1080, 1080];

export const skeleton = ComposePainter([
  DataProvider(View("#FF000099", "#0000FF99")),
]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
