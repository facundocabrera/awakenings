/**
 * Hook p5 sketch API with the presets.
 */
const Environment = presets => ctx => {
  function setup() {
    const [canvasWidth = 1080, canvasHeight = 1080] = presets.canvasSize;

    ctx.createCanvas(canvasWidth, canvasHeight);
    ctx.background(presets.background || 0);
    ctx.frameRate(presets.frameRate || 30);

    presets.forEach(
      painter => painter.setup({ 
        ctx, canvasWidth, canvasHeight, useOwnCanvas: false 
      })
    );
  }

  function draw() {
    presets.forEach(painter => painter.draw());
  }

  // Hook functions into p5 sketch configuration context
  ctx.setup = setup;
  ctx.draw = draw;
};

export {
  Environment
};