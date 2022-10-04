// QI WORKFLOW
import { compose, drawable } from "../../qi/flow";

// QI DRAWLETS
import { time, hook, clearCanvas, stopWhen, pixels, randomImage } from "../../qi/drawlets";

// QI TOOLS
import { convolution4 } from "../../qi/tools/images/convolution";
import { densify } from "../../qi/tools/images/gaussian-kernel";
import { convolutè } from "../../qi/tools/images/matrix";
import normalize from "../../qi/tools/matrix/normalize";

import { origin } from "../2022-09-18-canvas";

const convo = () => {
  let ui;
  let origin;
  let cw, ch;
  let img;

  const kernel = densify(
    normalize([
      [0, 0, 0],
      [0.5, 0, 0.5],
      [0, 0, 0],
    ]),
    [3, 3, 4]
  );

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

  const draw = ({ randomImage, pixels: [zoom, density] }) => {
    if (!img)
      img = randomImage;
    
    img.loadPixels();

    convolution4(
      img.pixels,
      [cw * zoom * density, ch * zoom * density, 4],
      [1, 1], // dx, dy
      (neighborhood) => convolutè(neighborhood, kernel, [3, 3, 4])
    );

    img.updatePixels();

    ui.image(img, 0, 0);
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
  width: 500,
  height: 500,
  background: "#000",
});
