/**
 * XY plotter.
 */
const XY = (presets) => {
  let global;
  let canvas;
  let width, height;
  let limit;
  let time;

  function setup({ ctx, canvasWidth, canvasHeight }) {
    global = ctx;
    width = canvasWidth;
    height = canvasHeight;

    console.log(`Canvas size: ${width}x${height}`);

    const {
      int, dist
    } = global;

    canvas = global.createGraphics(width, height);
    canvas.translate(width / 2, height / 2);
    canvas.rotate(3 * Math.PI / 2);

    limit = int(dist(0, 0, 350, 350));
    time = 0;
  }

  function draw() {
    time += .01;

    const {
      int, dist
    } = global;

    canvas.clear();

    const points = presets
      .map(context => {
        const point = context.fn.apply(context, [time]);
        
        return [point, context];
      })
      .filter(([ p ]) => {
        return int(dist(0, 0, ...p) <= limit);
      })
      .forEach(([p, context]) => {
        // canvas.fill(context.color);
        canvas.noFill();
        canvas.stroke(context.color);
        canvas.strokeWeight(2);
        canvas.ellipse(...p, 33, 33);
        canvas.rotate(Math.PI / 2);
      });

    return canvas;
  }

  return {
    setup,
    draw,
  };
};

export { XY };
