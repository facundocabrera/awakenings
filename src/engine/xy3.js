const XY3 = (preset) => {
  let global;
  let canvas;
  let width, height;
  let time = 1;

  function setup({ ctx, canvasWidth, canvasHeight }) {   
    global = ctx;
    width = canvasWidth;
    height = canvasHeight;

    console.log('Setup XY3.');
    console.log(`Canvas ${width}x${height}.`);
    console.log('preset', preset);

    // moving the center now move the axis 
    const center = preset.center(width, height);
    const axis = [  
      [center[0], 0, center[0], height],
      [0, center[1], width, center[1]]
    ];

    canvas = global.createGraphics(width, height);

    // draw axis
    if (preset.axis) {
      canvas.stroke('#FFFFFF55');
      canvas.strokeWeight(1);
      canvas.line(...axis[0]);
      canvas.line(...axis[1]);
    }

    // align coordinate system, remember it's rotate 180 deg given the canvas is draw from 0,0 point.
    canvas.translate(...center);

    preset.setup(canvas);

    time = preset.time;
  }

  function draw() {
    time += 1;

    preset.draw(
      preset.map(context => context.fn.apply(context, [time])), canvas, global
    );

    return canvas;
  }

  return {
    setup,
    draw,
  };
};

export { XY3 };
