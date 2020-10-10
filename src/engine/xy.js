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

    console.clear();
    console.log(`Canvas size: ${width}x${height}`);

    const { int, dist } = global;

    canvas = global.createGraphics(width, height);
    canvas.translate(width / 2, height / 2);

    limit = int(dist(0, 0, width / 2, height / 2));
    time = 0;
  }

  function draw() {
    time += 1;

    const { int, dist } = global;

    canvas.clear();

    presets
      .map((context) => {
        const point = context.fn.apply(context, [time]);

        return [point, context];
      })
      .filter(([p]) => {
        return int(dist(0, 0, ...p) <= limit);
      })
      .forEach(([[x, y], { fill, color, angle, rad }]) => {
        fill ? canvas.fill(color) : canvas.noFill();
        canvas.stroke(color);
        canvas.strokeWeight(1);
        canvas.ellipse(x, -1 * y, rad);
        canvas.rotate(angle);
      });

    return canvas;
  }

  return {
    setup,
    draw,
  };
};

export { XY };
