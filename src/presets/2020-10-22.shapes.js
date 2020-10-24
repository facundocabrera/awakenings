const { PI, cos, sqrt, pow, atan, abs, round, asin, sin, floor } = Math;

import { defaults } from "./defaults";
import { stops } from "../geometry/circle";
import { fragment } from "../geometry/points";

const scale = (elements, by) => elements.map(([x, y]) => [x * by, y * by]);

// const borderColor = '#13F4EF11'; 
const borderColor = '#E300F711';
// const lineColor = '#FFFE3711';
const lineColor = '#FD8EFF33';

const unity = 100;
const base = stops(6);

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  return [scale(fragment(base, t), unity / 2), t ];
}

const preset = defaults([
  {
    painter: "XY3",
    fn: pointAtom,
  },
]);

preset.background = '#5700BB';
preset.frameRate = 1;
preset.setup = (canvas, global) => {
  // canvas.rotate(PI / 6);
};
preset.draw = ([[vertex, t]], canvas, global) => {
  // if (t > 11) {
  //   global.noLoop();
  //   return;
  // }
  
  // canvas.clear();
  // canvas.rotate(PI / 6);

  // if (t % 4 === 0) {
  //   canvas.clear();
  //   canvas.rotate(PI / 6);
  // }

  // canvas.background(0);

  canvas.noFill();
  canvas.stroke(borderColor);
  // canvas.strokeWeight(1);

  // canvas.fill(borderColor);
  // canvas.ellipse(0, 0, unity);
  // canvas.noFill();
  // canvas.beginShape();
  vertex.map((v, i) => {
    canvas.stroke(borderColor);
    // canvas.fill(borderColor);
    canvas.ellipse(...v, unity);
    canvas.stroke(lineColor);
    canvas.line(0,0, ...v);
    // canvas.noFill();
    // canvas.vertex(...v);
  });
  // canvas.endShape(global.CLOSE);
};

export default preset;
