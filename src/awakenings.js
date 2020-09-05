import p5 from 'p5';

import { SpiralV1 } from './engine/spiral';

import { responsiveScreen } from './utils/responsive-screen';

const sketch = (ctx) => {
  const spiralPainter = SpiralV1();

  let canvasWidth;
  let canvasHeight;
  let mainCanvas;

  function setup() {
      [canvasWidth, canvasHeight] = responsiveScreen(ctx.windowWidth, ctx.windowHeight);

      mainCanvas = ctx.createCanvas(canvasWidth, canvasHeight);

      ctx.background(0);
      ctx.frameRate(30);

      spiralPainter.setup({
        ctx,
        canvasWidth,
        canvasHeight
      });
  }

  function draw() {
    ctx.image(spiralPainter.draw(), 0, 0);
  }

  // Hook functions into p5 sketch configuration context
  ctx.setup = setup;
  ctx.draw = draw;
};

const runtime = new p5(sketch);

console.log(runtime);