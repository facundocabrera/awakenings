import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

import { SplitLayout } from "../../qi-horizontal-split/layout";

import { XY } from "../../qi-axis";

import { DataProvider, CircularMapping } from "./data";

const WavePlotter = (color) => {
  let ui;

  const setup = ({ ctx }) => {
    ui = ctx;
  };

  const draw = ({ current }) => {
    ui.stroke(color);
    ui.ellipse(...current, 2);
  };

  return {
    setup,
    draw,
  };
};

// Settings del viewport
const frameRate = 60;
const canvasSize = [2 * 1080, 1080];

export const skeleton =
  // Hago el computo de los numeros y lo paso al resto del arbol.
  DataProvider(
    // Abstraer colleccion que debe recibir la misma información.
    ComposePainter([
      // Hoja Izquierda
      SplitLayout(XY(WavePlotter("#F500F577", 1)), 0),
      // Hoja Derecha
      SplitLayout(XY(CircularMapping(WavePlotter("#F5000077", 1))), 1),
    ])
  );

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
