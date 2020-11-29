import { defaults } from "./defaults";

import {
  build,
  prob as toProbabilities,
  angles as toAngles,
} from "../models/binomial/model-binomial";

import { Sequencer as BenfordTimeMachine } from "../machines/2020-11-05/sequencer";
import { Sequencer as TimeMachine } from "../machines/log-logistic-machine";

import { pick } from "../utils/array";
import { sin, cos, sqrt, tan } from "mathjs";
import { range } from "lodash";

const { PI } = Math;

const mapping = ["#7FFF00", "#FF1493", "#8A2BE2"];

const entry = (setSize, w, h) => {
  const bell = build(setSize);
  const prob = toProbabilities(bell);
  const angles = toAngles(prob);

  return {
    painter: "XY4",
    bell,
    prob,
    angles,
    w,
    h,
  };
};

const fn = (radius, steps, f) => (time) =>
  radius * f(((2 * PI) / steps) * (time / sqrt(time)));
const fnConstant = (radius) => () => radius;

// numero de lines que estoy dibujando
const chidrens = 12;

const preset = defaults(
  range(chidrens).map((i) => entry(8, fn(i * 200, 10, cos), fn(i * 200, 7, sin)))
);

const tm = TimeMachine(1, 1 / 4, 12);
// const tm = BenfordTimeMachine(chidrens + 1);
const tmNext = () => { 
  // const v = tm.next().value - 1;
  const v = tm.next().value;
  
  // console.log(v);

  return v;
};

preset.background = "#000";
preset.frameRate = 1;

preset.setup = (canvas, global) => {};

const plot = (canvas, angles, time, w, h, color) => {
  const α = pick(angles, time);

  canvas.noFill();
  canvas.stroke(color);
  canvas.strokeWeight(2);

  canvas.rotate(PI / 16);
  const [x, y] = [w(time), h(time)];

  // canvas.ellipse(x, y, 10);
  // console.log( x, y, PI - α );
  canvas.arc(0, 0, x, y, PI - α, 0);
};

preset.draw = (context, time, canvas, global) => {
  // if (time % 6 > 0) return;
  
  global.clear();
  canvas.clear();

  const c = (a) => {
    const col = global.color(pick(mapping, time));
    col.setAlpha(a);
    return col;
  };

  const current = context.slice(0, tmNext());

  // console.log(current);

  current.forEach(({ angles, w, h }) =>
    plot(canvas, angles, time, w, h, c(235))
  );
  current.forEach(({ angles, w, h }) =>
    plot(canvas, angles, time + 1, w, h, c(175))
  );
  current.forEach(({ angles, w, h }) =>
    plot(canvas, angles, time + 2, w, h, c(90))
  );
  current.forEach(({ angles, w, h }) =>
    plot(canvas, angles, time + 3, w, h, c(90))
  );
};

export default preset;
