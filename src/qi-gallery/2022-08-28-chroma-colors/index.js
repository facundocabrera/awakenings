import { zip } from "lodash";
import chroma from "chroma-js";

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
  let colorScale;

  const getColor = (time) => colorScale(ui.noise(time / 10)).hex();

  const blurEffect = (color, size = 6) => {
    ui.drawingContext.shadowBlur = size;
    ui.drawingContext.shadowColor = color;
    // ui.drawingContext.shadowOffsetX = 3;
    // ui.drawingContext.shadowOffsetY = 3;
  };

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;
    colorScale = chroma.scale(colors);
  };

  const draw = ({ time, waves, centers, circularWaves }) => {
    ui.push();

    // ui.strokeWeight(1);
    // ui.noFill();

    ui.translate(...origin);

    zip(waves, centers, circularWaves).map(([wave, center, circular]) => {
      const [wx, wy] = wave;
      const [cx, cy, arc] = center;
      const [cirx, ciry] = circular;

      ui.push();

      ui.translate(cx, cy);
      ui.rotate(arc);

      ui.strokeWeight(3);
      ui.stroke(getColor(time));
      blurEffect(getColor(time+2));

      for (let i = 0; i < 3; i++) {
        ui.point(wy, 0);
        // ui.point(wx, wy);
        ui.point(cirx, ciry);
      }

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

const colors = ['#FF36FF', '#36FFFF'];

export const skeleton = DataProvider(
  ComposePainter([inspect && WavesInspector(colors), CircularRenderer(colors)]),
  {
    curves: [
      { freq: 1 / 720, radius: 350 },
      { freq: 1 / 720, radius: 300 },
      { freq: 1 / 720, radius: 250 },
    ],
    functions: [
      { freq: 1 / 54, radius: 100 },
      { freq: 1 / 108, radius: 100 },
      { freq: 1 / 144, radius: 100 },
    ],
    circularFreq: 1 / 360
  }
);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
