// QI WORKFLOW
import { compose, drawable } from "../../qi/flow";

// QI DRAWLETS
import { time, hook, clearCanvas, stopWhen, pixels, loadImage } from "../../qi/drawlets";

// QI TOOLS
import { convolution4 } from "../../qi/tools/images/convolution";
import { densify } from "../../qi/tools/images/gaussian-kernel";
import { convolutè } from "../../qi/tools/images/matrix";

import { origin } from "../2022-09-18-canvas";

import heartImg from "../../qi/static/images/heart.png";

const convo = () => {
  let ui;
  let origin;
  let cw, ch;
  let alreadyLoaded = false;

  const kernel = densify(
    [
      [0, 0.25, 0],
      [0.25, 0, 0.25],
      [0, 0.25, 0],
    ],
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

  const draw = ({ loadImage, pixels: [zoom, density] }) => {
    const { img, isReady } = loadImage[heartImg];

    if (isReady() && !alreadyLoaded) {
      console.log('put image into the canvas');
      console.log('kernel', kernel);

      alreadyLoaded = true;
      // rescale image to fit the canvas area, increase the canvas size for more detail.
      ui.image(img, 0, 0, cw, img.height * cw / img.width);
    }
    
    if (alreadyLoaded) {
      ui.loadPixels();

      convolution4(
        ui.pixels,
        [cw * zoom * density, ch * zoom * density, 4],
        [1, 1], // dx, dy
        // 1. Computing new colors has the challenge of handling scaling correctly 
        //    after we apply the kernel. It is easy to get a white or black screen
        //    meaning we are out of range when computing the pixel value.
        (neighborhood) => convolutè(neighborhood, kernel, [3, 3, 4])
      );

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
  loadImage({ path: heartImg }),
  convo(),
  // stopWhen(({ time }) => time > 0),
]);

export const skeleton = trunk;

export const sketch = hook(skeleton, {
  frameRate: 5,
  width: 900,
  height: 900,
  background: "#000",
});
