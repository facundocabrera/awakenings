import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

import { pool } from "../../qi/pointer";

import { XY } from "../../qi-axis";
// const XY = (f) => ComposePainter([f]);

import { DataProvider } from "./data";

const PoolPlot = () => {
  let ui, bg, origin;

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;

    bg = [
      ui.random(255), // r is a random number between 0 - 255
      ui.random(100, 200), // g is a random number betwen 100 - 200
      ui.random(100), // b is a random number between 0 - 100
      90,
    ];
  };

  const draw = () => {
    const c = ui.color("white");

    ui.noFill();
    ui.stroke(c);
    ui.strokeWeight(1);

    for (let i = 0; i < pool.length; i++) {
      ui.ellipse(...pool[i], 10);
    }
  };

  return {
    name: "PoolPlot",
    setup,
    draw,
  };
};

const BezierPlot = () => {
  let ui;
  let width;
  let heigth;

  const setup = ({ ctx, dimensions: { to, center } }) => {
    ui = ctx;
    width = to[0];
    heigth = to[1];
    origin = center;
  };

  const draw = ({ pis, t }) => {
    const color = ui.lerpColor(ui.color("gold"), ui.color("purple"), t);

    ui.push();

    ui.translate(...origin);

    ui.fill(color);
    ui.stroke(color);
    ui.strokeWeight(1);

    pis.forEach(([x, y]) => ui.ellipse(x, -y, 5));

    ui.pop();
  };

  return {
    name: "BezierPlot",
    setup,
    draw,
  };
};

const frameRate = 15;
const canvasSize = [1080, 1080];

export const skeleton = XY(
  ComposePainter([PoolPlot(pool), DataProvider(BezierPlot(), pool, 3)])
);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
