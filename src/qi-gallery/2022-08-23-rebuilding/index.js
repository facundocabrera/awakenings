import { zip } from "lodash";

import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

import { DataProvider } from "./data";

const WavesInspector = (colors) => {
  let ui;
  let origin;

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;
  };

  const draw = ({ waves }) => {
    ui.push();

    ui.translate(...origin);

    zip(waves, colors).map(([point, color]) => {
      const [x, y] = point;

      ui.strokeWeight(4);
      ui.stroke(color);
      ui.point(x, y);
    });

    ui.pop();
  };

  return {
    name: "WavesInspector",
    setup,
    draw,
  };
};

const CircularRenderer = (colors) => {
  let ui;
  let origin;

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;
  };

  const draw = ({ waves, centers }) => {
    ui.push();

    ui.strokeWeight(1);
    ui.noFill();

    ui.translate(...origin);

    zip(waves, centers, colors).map(([wave, center, color]) => {
      const [, wy] = wave;
      const [cx, cy, arc] = center;

      ui.push();

      ui.translate(cx, cy);
      ui.rotate(arc);

      // Anillo
      // ui.strokeWeight(1);
      // ui.stroke('white');
      // ui.line(0, 0, 10, 0);

      ui.strokeWeight(4);
      ui.stroke(color);

      // Arranco con los axis rotados 90 grados,
      // Significa que los axis se intercambian para dibujar Y
      ui.point(wy, 0);

      ui.pop();
    });

    ui.pop();
  };

  return {
    name: "CircularRenderer",
    setup,
    draw,
  };
};

const frameRate = 60;
const canvasSize = [1080, 1080];

const inspect = false;

const colors = ["#65D46E", "#C55085", "#0000FF"];

export const skeleton = DataProvider(
  ComposePainter(
    [
      inspect && WavesInspector(colors),
      CircularRenderer(colors)
    ]
  )
);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
