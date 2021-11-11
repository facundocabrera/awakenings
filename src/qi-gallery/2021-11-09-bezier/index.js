import { range } from "lodash";

import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

// import { XY } from "../../qi-axis";
const XY = (f) => ComposePainter([f]);

import { polygon } from "../../geometry/polygon";
import { multiByScalar } from "../../geometry/scale";

import { DataProvider } from "./data";

// para poder usar correctamente los axis, tengo que invertir el valor de y
// por como dibuja el canvas!
const flipY = (points) => points.map(([x, y]) => [x, -y]);

const Lines = (anchors) => {
  const aux = flipY(anchors);
  let ui;
  let bg;

  const draw = () => {
    ui.push();

    ui.translate(...origin);

    const c = ui.color(...bg);

    ui.stroke(c);
    ui.fill(c);
    ui.strokeWeight(1);

    for (let i = 0; i < aux.length - 1; i++) {
      ui.line(...aux[i], ...aux[i + 1]);
    }

    ui.pop();
  };

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;

    bg = [
      ui.random(255), // r is a random number between 0 - 255
      ui.random(100, 200), // g is a random number betwen 100 - 200
      ui.random(100), // b is a random number between 0 - 100
      90,
    ];

    draw();
  };

  return {
    name: "Lines",
    setup,
    draw: () => {},
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

  const draw = ({ x, y, t }) => {
    const color = ui.lerpColor(ui.color(204, 0, 0), ui.color(240, 197, 68), t);

    ui.push();

    ui.translate(...origin);

    ui.fill(color);
    ui.stroke(color);
    ui.strokeWeight(1);

    ui.ellipse(x, -y, 5);

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

const shape = (vertices, shift, orbita, size, skip) => {
  let points = multiByScalar(polygon(vertices, orbita, shift), size);

  if (skip) {
    points = points.filter((v, i) => i % 2 !== 0);
  }

  // meto el primero al final asi me cierra el poligono.
  points.push(points[0]);

  return points;
};

const builder = (points, sampling) => [
  Lines(points),
  DataProvider(BezierPlot(), points, sampling),
];

const ratio = 400;

const flower = (petalos) =>
  range(0, 360, 360 / petalos)
    .map((angle) => builder(shape(petalos, angle, 1, ratio), 1 / 300))
    .flat(1);

const painters = flower(8);

export const skeleton = XY(ComposePainter(painters));

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
