const XY = painter => {
  let global;
  let width, height;
  let time;

  const _setup = painter.setup;
  const _draw = painter.draw;

  function setup({ ctx, canvasWidth, canvasHeight }) {
    global = ctx;
    width = canvasWidth;
    height = canvasHeight;

    console.log(`QI / XY / ${width}x${height}`);

    time = painter.time;

    _setup(global);
  }

  function draw() {   
    global.push();
    
    const center = painter.center(width, height);
    global.translate(...center);

    const rotation = painter.rotate();
    global.rotate(rotation);

    const renderedCanvas = _draw(time, global);

    global.pop();

    // move time forward
    time += 1;

    return renderedCanvas;
  }

  painter.setup = setup;
  painter.draw = draw;

  return painter;
};

export { XY };
