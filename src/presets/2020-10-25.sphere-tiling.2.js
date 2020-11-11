const { PI } = Math;

import { defaults } from "./defaults";

import { multiByScalar } from "../geometry/scale";
import { polygon } from "../geometry/polygon";

import { spherenit } from "../nit/spherenit2";

const unity = 144;

function pointAtom(t) {
  const { vertices } = this;

  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  const p = polygon(vertices, t);
  const s = multiByScalar(p, unity / 2);

  return s;
}

const preset = defaults([
  {
    painter: "XY4",
    fn: pointAtom,
    vertices: 4,
    color: "#FFFE37DD",
  },
  {
    painter: "XY4",
    fn: pointAtom,
    vertices: 2,
    color: "#01FE01DD",
  },
]);

// preset.center = (width, height) => {
//   return [width / 2, height / 2 + unity / 2];
// };

preset.background = "#000";
preset.frameRate = 1;
preset.setup = (canvas, global) => {
  // canvas.rotate(PI / 6);
};

const plot = (vertex, time, context, canvas, global) => {
  // if (time > 9) {
  //   global.noLoop();
  //   return;
  // }

  canvas.noFill();
  canvas.stroke(context.color);

  // canvas.ellipse(0,0, 2);

  spherenit({
    context,
    canvas,
    vertex,
    unity,
  });
};

preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  context.forEach((local) => {
    plot(local.fn(time), time, local, canvas, global);
  });
};

export default preset;
