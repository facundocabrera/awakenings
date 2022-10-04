import { once } from "lodash";

import { compose, drawable } from "../../qi/flow";
import { time, hook, clearCanvas, stopWhen, pixels } from "../../qi/drawlets";

import { convolution3, rgba_mutator } from "../../images/convolution";

import { kernel2D, densify } from "../../images/gaussian-kernel";
import { position } from "../../images/pixel";
import domain from "../../numbers/domain";

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

        const red = x % 256;
        const green = y % 256;
        const blue = (x * y) % 256;
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

const KERNEL_SIZE = 5;

const convo = () => {
  let ui;
  let origin;
  let cw, ch;

  let kernel;

  // Sigma should be 1,2,3 (actually with a value greater than 1 is okey to play)
  // smaller value creates a shape with all the non-zero values on the center area
  // instead of distribute across the kernel.
  const k = 3;
  const kDim = [KERNEL_SIZE, KERNEL_SIZE];
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

    console.log("before densify", kernel2D(...kParams));

    kernel = densify(kernel2D(...kParams), [...kDim, 4]);

    console.log("after densify", kernel);
  };

  const draw = ({ pixels: [zoom, density] }) => {
    ui.loadPixels();

    console.log("canvas storage length: ", ui.pixels.length);

    convolution3(
      ui.pixels,
      [cw * zoom * density, ch * zoom * density, 4],
      kernel,
      [...kDim, 4],
      rgba_mutator
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
  // stopWhen(({ time }) => time > 0),
]);

export const skeleton = trunk;

export const sketch = hook(skeleton, {
  frameRate: 1,
  width: KERNEL_SIZE * 100,
  height: KERNEL_SIZE * 100,
  background: "#000",
});
