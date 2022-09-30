import { once } from "lodash";

import { compose, drawable } from "../../qi/flow";
import { time, hook, clearCanvas, stopWhen, pixels } from "../../qi/drawlets";

import { rgbaConvolution } from "../../images/convolution";
import { kernel2D, densify } from "../../images/gaussian-kernel";
import { position } from "../../images/pixel";

import { origin } from "../2022-09-18-canvas";

const randomImage = () => {
  let ui;
  let cw, ch;

  const setup = (props) => {
    const {
      ctx,
      dimensions: {
        to: [width, height],
      },
    } = props;

    ui = ctx;
    cw = width;
    ch = height;
  };

  const draw = ({ pixels: [zoom, density] }) => {
    const img = ui.createImage(cw * density * zoom, ch * density * zoom);
    img.loadPixels();

    console.log("random image storage length: ", img.pixels.length);

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const index = position([x, y], [img.width, 4]);

        const red = ui.random(255);
        const green = ui.random(255);
        const blue = ui.random(255);
        const alpha = 255;

        img.pixels[index] = red;
        img.pixels[index + 1] = green;
        img.pixels[index + 2] = blue;
        img.pixels[index + 3] = alpha;
      }
    }

    img.updatePixels();

    ui.image(img, 0, 0);
  };

  return drawable(setup, once(draw));
};

const convo = () => {
  let ui;
  let origin;
  let cw, ch;

  let kernel;

  const k = 0.618;
  const kDim = [53, 53];
  const kParams = [k, ...kDim];

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

    kernel = densify(kernel2D(...kParams), [...kDim, 4]);
  };

  const draw = ({ pixels: [zoom, density] }) => {
    ui.loadPixels();

    console.log("canvas storage length: ", ui.pixels.length);

    rgbaConvolution(
      ui.pixels,
      [cw * zoom * density, ch * zoom * density, 4],
      kernel,
      [...kDim, 4]
    );

    ui.updatePixels();
  };

  return drawable(setup, draw);
};

const trunk = compose([
  pixels(),
  clearCanvas("#fff", true),
  origin(),
  time(0, 1),
  randomImage(),
  convo(),
  stopWhen(({ time }) => time > 0),
]);

export const skeleton = trunk;

export const sketch = hook(skeleton, {
  frameRate: 1,
  width: 900,
  height: 900,
  background: "#000",
});
