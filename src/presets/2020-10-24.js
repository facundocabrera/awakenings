const { PI, cos, sqrt, pow, atan, abs, round, asin, sin, floor } = Math;

import { defaults } from "./defaults";
import { stops } from "../geometry/circle";
import { fragment } from "../geometry/points";

const scale = (elements, by) => elements.map(([x, y]) => [x * by, y * by]);

// const borderColor = '#13F4EF11';
// const borderColor = '#E300F711';
const lineColor = "#FFFE37";
// const lineColor = '#FD8EFF33';

const unity = 100;
const base = stops(3);

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  return [scale(fragment(base, t), unity / 2), t];
}

const preset = defaults([
  {
    painter: "XY3",
    fn: pointAtom,
  },
]);

preset.background = "#000";
preset.frameRate = 1;
preset.setup = (canvas, global) => {
  canvas.rotate(PI / -6);
};
preset.draw = ([[vertex, t]], canvas, global) => {
  canvas.clear();
  canvas.noFill();

  canvas.stroke(lineColor);
  // canvas.beginShape(global.LINES);
  vertex.map((v, i) => {
    canvas.ellipse(...v, unity);
    // canvas.vertex(...v);
  });
  // canvas.endShape(global.CLOSE);
};

export default preset;
