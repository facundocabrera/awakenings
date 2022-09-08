import { drawable, compose } from "./";

const hook = (drawables) => (ctx) => {
  const setup = () => {
    // Esto debo abstraerlo a otro archivo ya que es parte de lo que quiero que sea configurable desde la UI.
    ctx.createCanvas(1080, 1080);
    ctx.background(0);
    ctx.frameRate(5);

    return {
      ctx,
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
  ctx.setup = joint.setup;
  ctx.draw = joint.draw;
};

export { hook };
