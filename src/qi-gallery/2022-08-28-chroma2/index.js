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
  let last;

  const getColor = (time) => colorScale(ui.noise(time/100)).hex();

  const blurEffect = (color, size = 10) => {
    ui.drawingContext.shadowBlur = size;
    ui.drawingContext.shadowColor = color;
    ui.drawingContext.shadowOffsetX = 1;
    ui.drawingContext.shadowOffsetY = 1;
  };

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;
    colorScale = chroma.scale(colors);
  };

  const draw = ({ time, waves, centers, circularWaves }) => {
    let current = [time, waves, centers, circularWaves];

    if (!last) {
      last = [time, waves, centers, circularWaves];
      
      return;
    }

    const [t_time, t_waves, t_centers, t_circularWaves] = last;
    const [t1_time, t1_waves, t1_centers, t1_circularWaves] = current;

    ui.push();

    ui.translate(...origin);

    zip(
      zip(t_waves, t1_waves),
      zip(t_centers, t1_centers), 
      zip(t_circularWaves, t1_circularWaves)
    ).map(([[ t_wave, t1_wave ], [t_center, t1_center], [t_circular, t1_circular]]) => {
      const [cx, cy, arc] = t1_center;

      ui.push();

      // ui.translate(cx, cy);
      ui.rotate(arc);

      ui.strokeWeight(1);
      ui.stroke(getColor(time));
      blurEffect(getColor(time+3));

      ui.noise(time/100)

      for (let i = 0; i < 1; i++) {
        ui.line(
          t_wave[1] * ui.noise(time/100), 0,
          t1_wave[1] * ui.noise(time/100), 0
        );
        // ui.line(...t_wave, ...t1_wave);
        // [t_center, t1_center,t_circular,t1_circular].map(p => ui.point(...p));
        // ui.line(...t_circular, ...t1_circular);
        // ui.point(wx, wy);
        // ui.point(cirx, ciry);
      }

      ui.pop();
    });

    ui.pop();

    last = current;
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

// const colors = ['#FF36FF99', '#36FFFF99'];
const colors = ['#FF360099', '#FFED0088'];

export const skeleton = DataProvider(
  ComposePainter([inspect && WavesInspector(colors), CircularRenderer(colors)]),
  {
    curves: [
      { freq: 1 / 1000, radius: 100 },
      { freq: 1 / 1000, radius: 100 },
      // { freq: 1 / 720, radius: 300 },
      // { freq: 1 / 720, radius: 250 },
    ],
    functions: [
      { freq: 1 / 5, radius: 600 },
      { freq: 1 / 7, radius: 600 },
      // { freq: 1 / 108, radius: 100 },
      // { freq: 1 / 144, radius: 100 },
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
