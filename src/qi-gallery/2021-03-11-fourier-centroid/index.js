import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Painter, Canvas, ComposePainter } from "../../qi/interfaces";

import { SplitLayout } from "../../qi-horizontal-split/layout";

import { XY } from "../../qi-axis";

import { DataProvider } from "./data";

import { centroid } from "../../geometry/vector";

export const Painter16 = (color, strokeWeight = 4) => {
  let ui;
  let last;

  function setup({ ctx }) {
    ui = ctx;
  }

  function draw({ points }) {
    const current = points.slice(-1)[0];

    if (!last) {
      last = current;
      return;
    }

    ui.push();

    ui.stroke(color);
    ui.strokeWeight(strokeWeight);

    ui.line(...last, ...current);

    ui.pop();

    last = current;
  }

  return Painter({
    setup,
    draw,
  });
};

export const PainterCentroid = () => {
  let ui;
  let oids = [];
  let screen;

  function setup({ ctx, dimensions }) {
    ui = ctx;
    screen = dimensions;
  }

  function draw({ time, points }) {
    // calculo el centro de todos los puntos que se estan teniendo en cuenta
    // para calcular current.
    oids.push(centroid(points));

    // calculo el x-coordinate del centro de los centros acumulados
    const xCoordinateCentroid = [time, -centroid(oids)[0]];

    ui.push();
    ui.translate(-(screen.center[0] - screen.from[0]), 0);

    ui.stroke("red");
    ui.strokeWeight(1);
    ui.ellipse(...xCoordinateCentroid, 2);

    ui.pop();
  }

  return {
    setup,
    draw,
  };
};

// Settings del viewport
const frameRate = 60;
const canvasSize = [2 * 1080, 1080];

// Subir o bajar la calidad del dibujo.
const hq = 10;

const circles = [
  { freq: 7 * hq, radius: 100 },
  { freq: -7 * hq, radius: 100 },
  // { freq: 857 * hq, radius: 100 },
];

export const skeleton =
  // Hago el computo de los numeros y lo paso al resto del arbol.
  DataProvider(
    // Abstraer colleccion que debe recibir la misma información.
    ComposePainter([
      // Hoja Izquierda
      SplitLayout(Painter16("#F500F577", 8), 0),
      // Hoja Derecha
      SplitLayout(XY(PainterCentroid("#F5000077")), 1),
    ]),
    circles
  );

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
