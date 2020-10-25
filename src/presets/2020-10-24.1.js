import { defaults } from "./defaults";

import { multiByScalar } from "../geometry/scale";
import { polygon } from "../geometry/polygon";

import { polygonit } from "../nit/polygonit";

const unity = 100;

function pointAtom(t) {
  const {
    vertices
  } = this;
  
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  const p = polygon(vertices, t);
  const s = multiByScalar(p, unity / 2);

  return s;
}

const preset = defaults([
  {
    painter: "XY4",
    fn: pointAtom,
    vertices: 3,
    color: '#FFFE3777'
  },
  {
    painter: "XY4",
    fn: pointAtom,
    vertices: 4,
    color: '#13F4EF77'
  },
  {
    painter: "XY4",
    fn: pointAtom,
    vertices: 5,
    color: '#E300F777'
  },
  // {
  //   painter: "XY4",
  //   fn: pointAtom,
  //   vertices: 3,
  //   color: '#FFFE3777'
  // },
  // {
  //   painter: "XY4",
  //   fn: pointAtom,
  //   vertices: 6,
  //   color: '#13F4EF77'
  // },
  // {
  //   painter: "XY4",
  //   fn: pointAtom,
  //   vertices: 12,
  //   color: '#E300F777'
  // },
]);

preset.background = "#000";
preset.frameRate = 1;
preset.setup = (canvas, global) => {
  // canvas.rotate(PI / 3);
};

const plot = (vertex, time, context, canvas, global) => {
  if (time > 9) {
    global.noLoop();
    return;
  }

  canvas.noFill();
  canvas.stroke(context.color);

  polygonit({
    global,
    canvas,
    vertex,
    time,
    unity
  });
};

preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  context.forEach(local => {
    plot(local.fn(time), time, local, canvas, global);
  });

};

export default preset;
