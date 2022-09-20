import chroma from "chroma-js";
import { branch, compose, drawable } from "../../qi/flow";
import {
  time,
  pushPop,
  axis,
  hook,
  clearCanvas,
  memory,
  oscillator,
  stopWhen,
} from "../../qi/drawlets";
import store from "../../qi/store";

import { flipY } from "../../utils/render";
import { toText } from "../../utils/text";

import { sum, mult } from "../../geometry/vector";

import { bezier2d, lerp2d } from "../../bezier/lerp";

import Controls from "./controls";
export { store, Controls };

import logistic from "./logistic";

const origin = () => {
  const setup = (props) => {
    const {
      dimensions: {
        to: [, height],
      },
    } = props;

    return {
      dimensions: {
        ...props.dimensions,
        center: [0, height - 20],
      },
    };
  };

  return drawable(setup);
};

const plot = () => {
  let ui;
  let origin;
  let toPosition;

  const color = chroma.scale(["#F0EF5399", "#8332FA99"]).mode("lch");

  const setup = (props) => {
    const {
      ctx,
      dimensions: {
        to: [width, height],
        center,
      },
    } = props;

    ui = ctx;
    origin = center;

    const pxDensity = ui.pixelDensity();
    toPosition = ([x, y]) => 4 * Math.round(Math.abs(x) * Math.abs(y));
  };

  const draw = ({ point }) => {
    const scaled = mult(point, 600);

    ui.translate(...origin);

    ui.loadPixels();

    const pixels = ui.pixels;
    const pos = toPosition(scaled);

    console.log(pos);
    console.log(pixels);
    console.log(pixels[pos], pixels[pos + 1], pixels[pos + 1], pixels[pos + 1]);

    ui.strokeWeight(1);
    // ui.noStroke();
    // ui.stroke(color(point[0]).hex());
    ui.stroke("white");
    ui.noFill();
    // ui.fill(color(point[0] * point[1] / 2).hex());

    ui.ellipse(...flipY(scaled), 4);
    // ui.ellipse(...mult(flipY(point), 100), Math.abs(point[0] * point[1] * 100));
  };

  return pushPop(drawable(setup, draw));
};

const trunk = compose([
  origin(),
  // clearCanvas('#222'),
  time(0, 0.001),
  logistic(4, 0.66, 3.789, 0.77),
  // axis(),
  plot(),
  // stopWhen(({ time }) => (time > 2)),
]);

export const skeleton = trunk;

export const sketch = hook(skeleton, {
  frameRate: 60,
  width: 1000,
  height: 1000,
  background: "#222",
});
