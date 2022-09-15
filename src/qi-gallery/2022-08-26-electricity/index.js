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

  const blurEffect = (color, size = 3) => {
    ui.drawingContext.shadowBlur = size;
    ui.drawingContext.shadowColor = color;
    // ui.drawingContext.shadowOffsetX = 3;
    // ui.drawingContext.shadowOffsetY = 3;
  };

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;
  };

  const draw = ({ waves, centers, circularWaves }) => {
    ui.push();

    ui.strokeWeight(1);
    ui.noFill();

    ui.translate(...origin);

    zip(waves, centers, circularWaves, colors).map(
      ([wave, center, circular, color]) => {
        const [, wy] = wave;
        const [cx, cy, arc] = center;
        const [cirx, ciry] = circular;

        ui.push();

        ui.translate(cx, cy);
        ui.rotate(arc);

        // Anillo
        // ui.strokeWeight(1);
        // ui.stroke('#D1B17F77');
        // ui.line(0, 0, 10, 0);

        ui.strokeWeight(5);
        ui.stroke(color);
        // blurEffect('#ECE3BD');
        blurEffect(color);

        // Arranco con los axis rotados 90 grados,
        // Significa que los axis se intercambian para dibujar Y
        for (let i = 0; i < 3; i++) {
          ui.point(wy, 0);
          ui.point(cirx, ciry);
        }

        ui.pop();
      }
    );

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

const colors = ["#EB7D7F99", "#EBDFC099", "#A0DDF199"];
// const colors = ["#ECE3BD", "#ECE3BD", "#ECE3BD"];

export const skeleton = DataProvider(
  ComposePainter([inspect && WavesInspector(colors), CircularRenderer(colors)]),
  {
    curves: [
      { freq: 1 / 360, radius: 100 },
      { freq: 1 / 360, radius: 200 },
      { freq: 1 / 360, radius: 300 },
    ],
    functions: [
      { freq: 1 / 16, radius: 100 },
      { freq: 1 / 32, radius: 100 },
      { freq: 1 / 64, radius: 100 },
    ],
    circularFreq: 1 / 360,
  }
);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
