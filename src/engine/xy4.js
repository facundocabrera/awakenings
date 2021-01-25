const XY4 = (preset) => {
  let global;
  let canvas;
  let width, height;
  let time;

  const _setup = preset.setup;
  const _draw = preset.draw;

  function setup({ ctx, canvasWidth, canvasHeight, useOwnCanvas }) {
    global = ctx;
    width = canvasWidth;
    height = canvasHeight;

    // 2020-12-30
    // Para que la cosa tenga performance, es necesario no usar varios canvas
    // sino hacer las abstracciones numericamente y renderizar todo de una, pero
    // dejo el fallback para las implementaciones anteriores.
    canvas = useOwnCanvas ? global.createGraphics(width, height) : global;

    console.log("Setup XY4.");
    console.log(`Canvas ${width}x${height}.`);

    // moving the center now move the axis
    const center = preset.center(width, height);
    const axis = [
      [center[0], 0, center[0], height],
      [0, center[1], width, center[1]],
    ];

    // draw axis
    if (preset.axis) {
      canvas.stroke("#FFFFFF55");
      canvas.strokeWeight(1);
      canvas.line(...axis[0]);
      canvas.line(...axis[1]);
    }

    // align coordinate system.
    // remember it's rotate 180 deg given the canvas is draw from 0,0 point.
    canvas.translate(...center);

    time = preset.time;

    _setup(canvas, global);
  }

  function draw() {
    _draw(preset, time, canvas, global);

    time += 1;

    return canvas;
  }

  preset.setup = setup;
  preset.draw = draw;

  return preset;
};

export { XY4 };
