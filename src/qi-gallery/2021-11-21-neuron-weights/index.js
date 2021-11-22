/**
 * Comparación entre activación stable entre las neuronas, y activación
 * aleatoria.
 * Observar la caja roja que encierra los puntos promedio de las activaciones,
 * se observa como se delimita un area de acción.
 */
import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";
import { SplitLayout } from "../../qi-vertical-split/layout";
import { scale } from "../../geometry/scale";

import { SameForAllProvider } from "./activations/same-for-all";
import { RandomForAllProvider } from "./activations/random-for-all";
import { DataProvider } from "./data";

const WeightsPlot = () => {
  let ui;
  let origin;

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;
  };

  const draw = ({ min, max, lines, gravity, weightsVector, t }) => {
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

    const zoom = 1;
    const zGravity = scale(gravity, zoom);
    const zMin = scale(min, zoom);
    const zMax = scale(max, zoom);

    ui.stroke(ui.color(121, 34, 69, 100));
    ui.strokeWeight(1);
    ui.ellipse(...zGravity, 1);

    ui.stroke(ui.color(121, 0, 0, 200));
    ui.noFill();
    ui.rect(zMin[0], zMax[1], zMax[0] - zMin[0], zMin[1] - zMax[1]);

    ui.pop();
  };

  return {
    name: "WeightsPlot",
    setup,
    draw,
  };
};

const frameRate = 120;
const canvasSize = [1080, 1080 * 2];

const weights = 36;

const p1 = SplitLayout(
  SameForAllProvider(DataProvider(WeightsPlot(), weights)),
  0
);

const p2 = SplitLayout(
  RandomForAllProvider(DataProvider(WeightsPlot(), weights)),
  1
);

export const skeleton = ComposePainter([p1, p2]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
