import { drawable, compose } from "../flow";

import store from "../store";
import { getFrameRate, getCanvasWidth, getCanvasHeight } from "../BaseControls";

const hook = (drawables) => (p5js) => {
  const setup = () => {
    const state = store.getState();

    const frameRate = getFrameRate(state);
    const canvasWidth = getCanvasWidth(state);
    const canvasHeight = getCanvasHeight(state);

    p5js.createCanvas(canvasWidth, canvasHeight);
    p5js.background(0);
    p5js.frameRate(frameRate);

    return {
      ctx: p5js,
      dimensions: {
        from: [0, 0],
        to: [canvasWidth, canvasHeight],
        center: [canvasWidth / 2, canvasHeight / 2],
      },
    };
  };

  const startUp = drawable(setup);
  const joint = compose([startUp, drawables]);

  // Hook functions into p5 sketch configuration context
  p5js.setup = joint.setup;
  p5js.draw = joint.draw;
};

export { hook };
