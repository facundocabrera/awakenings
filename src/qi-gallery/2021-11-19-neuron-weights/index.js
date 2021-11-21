/**
 * Se puede observar, que dado un conjunto aleatorio de weigths, si usamos la
 * magia de la circunferencia, podemos encontrar un rango estable en el que
 * opera el promedio de los puntos, pudiendo evaluar la performance
 * de un grupo de weights dado un valor para todos los weights. Esto seria
 * equivalente a un grupo de neuronas observando el mismo valor de activación.
 */
import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

import { pool } from "../../qi/pointer";

// import { XY } from "../../qi-axis";
const XY = (f) => ComposePainter([f]);

import { DataProvider } from "./data";

const WeightsPlot = () => {
  let ui;
  let width;
  let heigth;

  const setup = ({ ctx, dimensions: { to, center } }) => {
    ui = ctx;
    width = to[0];
    heigth = to[1];
    origin = center;
  };

  const draw = ({ lines, gravity, weightsVector, t }) => {
    ui.push();

    ui.translate(...origin);
    ui.strokeWeight(3);

    lines.forEach(([start, stop], index) => {
      const color = ui.lerpColor(
        ui.color("gold"),
        ui.color("purple"),
        weightsVector[index] * t
      );
      ui.fill(color);
      ui.stroke(color);
      ui.line(...start, ...stop);
    });

    ui.fill(ui.color(121, 34, 69, 200));
    ui.stroke(ui.color(255, 255, 255, 99));
    ui.strokeWeight(3);
    ui.ellipse(...gravity, 15);

    ui.pop();
  };

  return {
    name: "WeightsPlot",
    setup,
    draw,
  };
};

const frameRate = 15;
const canvasSize = [1080, 1080];

const weights = 26;

export const skeleton = XY(
  ComposePainter([DataProvider(WeightsPlot(pool), weights)])
);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
