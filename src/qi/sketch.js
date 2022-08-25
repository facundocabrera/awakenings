import { checkCanvas, checkDrawable } from "./interfaces";

/**
 * Hook p5 sketch API with the painters.
 */
const Environment = (painters) => (ctx) => {
  checkCanvas(painters);
  checkDrawable(painters);

  function setup() {
    const [canvasWidth = 1080, canvasHeight = 1080] = painters.canvasSize;

    ctx.createCanvas(canvasWidth, canvasHeight);
    ctx.background(painters.background || 0);
    ctx.frameRate(painters.frameRate || 30);

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
