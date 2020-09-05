require('p5');
require('p5/lib/addons/p5.sound');

import { SpiralV1 } from './engine/spiral';
import { SoundV1 } from './engine/sound';

import { responsiveScreen } from './utils/responsive-screen';

const sketch = (ctx) => {
  const spiralPainter = SpiralV1();
  const soundPainter = SoundV1();

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

      soundPainter.setup({
        ctx,
        canvasWidth,
        canvasHeight
      });
  }

  function draw() {
    // if (ctx.frameCount % 8)
    //   ctx.clear();

    ctx.image(spiralPainter.draw(), 0, 0);
    //ctx.image(soundPainter.draw(), 0, 0);
  }

  // Hook functions into p5 sketch configuration context
  ctx.setup = setup;
  ctx.draw = draw;
};

const runtime = new p5(sketch);

onmousedown = () => runtime.userStartAudio();
