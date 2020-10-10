const XY2 = (presets) => {
  let global;
  let canvas;
  let width, height;
  let limit;
  let time;

  function setup({ ctx, canvasWidth, canvasHeight }) {
    global = ctx;
    width = canvasWidth;
    height = canvasHeight;

    const { int, dist } = global;

    // moving the center now move the axis
    const center = presets.center(width, height);
    const axis = [
      [center[0], 0, center[0], height],
      [0, center[1], width, center[1]],
    ];

    canvas = global.createGraphics(width, height);

    // draw axis
    if (presets.axis) {
      canvas.stroke("white");
      canvas.strokeWeight(1);
      canvas.line(...axis[0]);
      canvas.line(...axis[1]);
    }

    // align coordinate system, remember it's rotate 180 deg given the canvas is draw from 0,0 point.
    canvas.translate(...center);

    limit = int(dist(0, 0, ...center));
    time = 0;
  }

  function draw() {
    time += 1;

    const { int, dist } = global;

    presets.before(canvas);

    presets
      .map((context) => {
        const point = context.fn.apply(context, [time]);

        return [point, context];
      })
      .filter(([p]) => {
        return int(dist(0, 0, ...p) <= limit);
      })
      .forEach(([[x, y], { fill, color, angle, rad }]) => {
        (fill && canvas.fill(color)) || canvas.noFill();
        canvas.stroke(color);
        canvas.strokeWeight(1);
        angle !== 0 && canvas.rotate(angle);
        canvas.ellipse(x, -1 * y, rad);
      });

    return canvas;
  }

  return {
    setup,
    draw,
  };
};

export { XY2 };
