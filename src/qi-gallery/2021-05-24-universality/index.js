import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

import { DataProvider1, DataProvider2, DataProvider3 } from "./data";

const Plot = () => {
  let ui;
  let width;
  let heigth;
  let bg;

  const setup = ({ ctx, dimensions: { to } }) => {
    ui = ctx;
    width = to[0];
    heigth = to[1];

    bg = [
      ui.random(255), // r is a random number between 0 - 255
      ui.random(100,200), // g is a random number betwen 100 - 200
      ui.random(100), // b is a random number between 0 - 100
      ui.random(200,255), // a is a random number between 200 - 255
    ];
  };

  const draw = ({ x, y }) => {
    ui.noFill();
    ui.stroke(bg[0], bg[1], bg[2], bg[3] * y);
    ui.strokeWeight(1);

    ui.ellipse(x * width, y * heigth, 15);
  };

  return {
    setup,
    draw,
  };
};

const frameRate = 60;
const canvasSize = [1080, 1080];

// ----
// const paints = [];
// for(let i = 1; i < 10; i++) {
//   paints.push(
//     DataProvider(Plot(), i, .7)
//   );
// }

// export const skeleton = ComposePainter(paints);
// ----

export const skeleton = ComposePainter([
  DataProvider1(Plot(), 4, 0.60),
  DataProvider2(Plot(), 1, 0.60),
  DataProvider3(Plot(), 1, 0.60),
]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
