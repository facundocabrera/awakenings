import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";
import { DataProvider } from "./data";

const maxmax = (last = -Infinity) => (n) => {
  last = Math.max(last, n);
  return last;
};

const NetPlot = () => {
  let ui;
  let origin;
  let max = maxmax();

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;
  };

  const draw = ({ cloud_vector }) => {
    const [x, y, z] = cloud_vector;

    ui.noFill();
    ui.stroke(121, 34, (255 * z) / max(z), 50);
    ui.strokeWeight(5);

    ui.ellipse(x * 5, y * 5, 7);
  };

  return {
    name: "NetPlot",
    setup,
    draw,
  };
};

const frameRate = 60;
const canvasSize = [1080, 1080];

export const skeleton = ComposePainter([DataProvider(NetPlot())]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
