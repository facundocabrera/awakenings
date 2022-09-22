import { once } from "lodash";

import { compose, drawable } from "../../qi/flow";
import { time, hook, clearCanvas, stopWhen, pixels } from "../../qi/drawlets";

import { scale } from "../../images/pixel";
import { convolution } from "../../images/convolution";

import { origin, plot } from "../2022-09-18-canvas";

const convo = () => {
  let ui;
  let origin;
  let cw, ch;

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
    cw = width;
    ch = height;
  };

  const draw = ({ pixels: [zoom, density] }) => {
    ui.loadPixels();

    const transform = [scale([0.5, 0, 0, 1], density)];
    const tW = 1;
    const tH = 1;

    convolution(
      ui.pixels,
      transform,
      [cw, ch, 4 * density],
      [tW, tH, 4 * density]
    );

    ui.updatePixels();
  };

  return drawable(setup, once(draw));
};

const trunk = compose([
  pixels(),
  clearCanvas("#fff", true),
  origin(),
  time(0, 1),
  plot(),
  convo(),
  stopWhen(({ time }) => time > 0),
]);

export const skeleton = trunk;

export const sketch = hook(skeleton, {
  frameRate: 60,
  width: 100,
  height: 100,
  background: "#000",
});
