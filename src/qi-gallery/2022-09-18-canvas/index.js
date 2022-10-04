import { compose, drawable } from "../../qi/flow";
import {
  time,
  pushPop,
  hook,
  clearCanvas,
  stopWhen,
  pixels,
} from "../../qi/drawlets";

import { scale, set } from "../../qi/tools/images/pixel";

export const origin = () => {
  const setup = (props) => {
    const {
      dimensions: {
        to: [, height],
      },
    } = props;

    return {
      dimensions: {
        ...props.dimensions,
        center: [0, 0],
      },
    };
  };

  return drawable(setup);
};

export const plot = () => {
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

  const draw = ({ pixels: [zoomLevel, density] }) => {
    const c = [255, 0, 0, 255];

    ui.translate(...origin);

    ui.loadPixels();

    for (let i = 0; i < 100; i++) {
      for (let j = 100; j <= 100; j++) {
        set(
          ui.pixels,
          [i, j],
          [cw, 4 * density * zoomLevel],
          scale(c, density * zoomLevel)
        );
      }
    }

    for (let i = 45; i < 55; i++) {
      for (let j = 0; j < 200; j++) {
        set(
          ui.pixels,
          [i, j],
          [cw, 4 * density * zoomLevel],
          scale(c, density * zoomLevel)
        );
      }
    }

    ui.updatePixels();
  };

  return pushPop(drawable(setup, draw));
};

const trunk = compose([
  pixels(),
  clearCanvas("#fff", true),
  origin(),
  time(0, 1),
  plot(),
  stopWhen(({ time }) => time > 0),
]);

export const skeleton = trunk;

export const sketch = hook(skeleton, {
  frameRate: 60,
  width: 100,
  height: 100,
  background: "#000",
});
