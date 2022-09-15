/** @DEPRECATED */

import { checkCanvas, checkDrawable } from "./interfaces";

import store from "./store";
import { getCanvasWidth, getCanvasHeight, getFrameRate } from "./BaseControls";

const canvasFromParameters = () => {
  const state = store.getState();

  return [getCanvasWidth(state), getCanvasHeight(state)];
};

const frameRateFromParameters = () => {
  const state = store.getState();

  return getFrameRate(state);
};

/**
 * Hook p5 sketch API with the painters.
 */
const Environment = (painters) => (ctx) => {
  checkCanvas(painters);
  checkDrawable(painters);

  function setup() {
    const [canvasWidth = 1080, canvasHeight = 1080] =
      painters.canvasSize || canvasFromParameters();

    ctx.createCanvas(canvasWidth, canvasHeight);
    ctx.background(painters.background || 0);
    ctx.frameRate(painters.frameRate || frameRateFromParameters() || 30);

    painters.setup({
      ctx,
      dimensions: {
        from: [0, 0],
        to: [canvasWidth, canvasHeight],
        center: [canvasWidth / 2, canvasHeight / 2],
      },
    });
  }

  // Hook functions into p5 sketch configuration context
  ctx.setup = setup;
  ctx.draw = painters.draw;
};

export { Environment };
