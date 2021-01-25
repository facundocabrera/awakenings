import { checkDrawable, checkCanvas } from "./interfaces";

export const BaseLayer = (painter) => {
  let global;
  let width, height;
  let time;

  checkDrawable(painter);
  checkCanvas(painter);

  const _setup = painter.setup;
  const _draw = painter.draw;

  function setup({ ctx, canvasWidth, canvasHeight }) {
    global = ctx;
    width = canvasWidth;
    height = canvasHeight;

    time = painter.time;

    _setup({ ctx, canvasWidth, canvasHeight });
  }

  function draw() {
    global.push();

    _draw({
      ui: global,
      time,
    });

    global.pop();

    // move time forward
    time += 1;
  }

  painter.setup = setup;
  painter.draw = draw;

  return painter;
};
