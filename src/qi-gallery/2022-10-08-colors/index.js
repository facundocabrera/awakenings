// QI WORKFLOW
import { compose, drawable } from "../../qi/flow";

// QI DRAWLETS
import {
  time,
  hook,
  clearCanvas,
  stopWhen,
  pixels,
  loadImageOnCanvas,
  origin,
} from "../../qi/drawlets";

import heartImg from "../../qi/static/images/virgen-de-las-rocas.jpg";
import filter from "../../qi/tools/color/filter";

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

  const draw = ({ loadImage }) => {
    const { loadedOnCanvas } = loadImage[heartImg];

    if (loadedOnCanvas) {
      ui.loadPixels();

      for (let x = 0; x < ui.pixels.length; x += 4) {
        const [v1, v2, v3, v4] = filter(
          [ui.pixels[x], ui.pixels[x + 1], ui.pixels[x + 2], ui.pixels[x + 3]],
          [0.1, 0, 0, 0]
        );

        ui.pixels[x] = v1;
        ui.pixels[x + 1] = v2;
        ui.pixels[x + 2] = v3;
        ui.pixels[x + 3] = v4;
      }

      ui.updatePixels();
    }
  };

  return drawable(setup, draw);
};

const trunk = compose([
  pixels(),
  clearCanvas("#fff", true),
  origin(),
  time(0, 1),
  loadImageOnCanvas({ path: heartImg }),
  convo(),
  // stopWhen(({ time }) => time > 0),
]);

export const skeleton = trunk;

export const sketch = hook(skeleton, {
  frameRate: 1,
  width: 865, // 3460
  height: 1372, // 5487
  background: "#000",
});
