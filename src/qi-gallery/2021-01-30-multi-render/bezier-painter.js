import { Painter } from "../../qi/interfaces";

import { freqMapping as fm, PI } from "../../utils/waves";

const GenericPainter = (bezierPoints, color) => {
  let ui;

  function setup({ ctx }) {
    ui = ctx;
  }

  function draw({ time }) {
    // rotate
    ui.rotate(PI / 2);

    // draw a bezier curve using the calculated frequency points
    ui.noFill();
    ui.stroke(color);
    ui.bezier(...bezierPoints(time));
  }

  return Painter({
    setup,
    draw,
  });
};

// Bezier curve arguments (4 pairs [x, y])
// This is just an example, build your own array
const defaultPoints = (time) => [
  ...fm({ time, freq: 1 / 8, radius: 150 }),
  ...fm({ time, freq: 1 / 32, radius: 150 }),
  ...fm({ time, freq: 1 / 54, radius: 150 }),
  ...fm({ time, freq: 1 / 16, radius: 150 }),
];

export const builder = (color, points = defaultPoints) =>
  GenericPainter(points, color);
