import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

import { SplitLayout } from "../../qi-horizontal-split/layout";

import { XY } from "../../qi-axis";

import { DataProvider, CircularMapping, ComputeCentroid } from "./data";

const CentroidPlotter = (color) => {
  let ui;

  const setup = ({ ctx }) => {
    ui = ctx;
  };

  const draw = ({ oid }) => {
    console.log(oid);

    ui.stroke(color);
    ui.ellipse(...oid, 2);
  };

  return {
    setup,
    draw,
  };
};

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

export const skeleton = DataProvider(
  CircularMapping(
    ComputeCentroid(
      ComposePainter([
        SplitLayout(XY(CentroidPlotter("#F500F555")), 0),
        SplitLayout(XY(WavePlotter("#F5000077")), 1),
      ])
    )
  )
);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
