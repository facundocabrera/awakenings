import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

import { FN, Zip } from "./data";

const View = (color, fill) => {
  let ui;
  let origin;

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;
  };

  const draw = ({ radius }) => {
    ui.clear();
    ui.background(0);

    ui.push();
    ui.translate(...origin);

    ui.strokeWeight(5);
    ui.stroke(color);
    ui.fill(fill);

    ui.ellipse(0, 0, radius);
    ui.ellipse(0, 0, radius / 3);
    ui.ellipse(0, 0, radius / 7);

    ui.pop();
  };

  return {
    name: "View",
    setup,
    draw,
  };
};

const frameRate = 60;
const canvasSize = [1080, 1080];

export const skeleton = ComposePainter([
  Zip(
    // [FN(100, 0.236), FN(100, 0.382), FN(100, 0.618), FN(100, 0.786)],
    // [FN(100, 2), FN(100, 9), FN(100, 8)],
    [FN(100, 2)],
    View("#0000FF", "#0000FF99")
  ),
]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
