const { PI, cos, sqrt, pow } = Math;

import { walker } from "../random-walk/benford-walker";

const mapping = ["#B9977811", "#F4D8C311", "#D37A3C11", "#F7FDF911"];

const fixedAcc = (t) => 1;
const acc = (t) => fixedAcc(t);

const v = (t) => t * acc(t);

const freqAtom = (steps, phase = 0) => {
  return (t) => {
    if (!Number.isFinite(t)) throw "fn.freqAtom / Invalid time parameters";

    const v = t * ((2 * Math.PI) / steps) + phase;

    if (!Number.isFinite(v)) throw "fn.freqAtom / Invalid return value";

    return v;
  };
};

const Ax = (t) => 500;
const Ay = (t) => 500;

// La funcion sin no es mas que un cos con phase π/2
const sin = (x) => cos(x + PI / 2);

// esto significa que puedo crearme mis propias funciones trigonometricas alterando la fase.
const sx = (x) => cos(x + PI / 6);
const sy = (x) => cos(x);

const xAtom = (f) => (t) => Ax(t) * sx(f(t));
const yAtom = (f) => (t) => Ay(t) * sy(f(t));
const zeroAtom = () => 0;

const x1 = zeroAtom;
const y1 = yAtom(freqAtom(2));

const x2 = xAtom(freqAtom(3));
const y2 = yAtom(freqAtom(5));

const x3 = xAtom(freqAtom(5));
const y3 = yAtom(freqAtom(3));

const x4 = zeroAtom;
const y4 = yAtom(freqAtom(-2));

function pointAtom(t) {
  const { x, y } = this;

  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  const point = [x(v(t)), -1 * y(v(t))];

  if (!Number.isFinite(point[0])) throw "fn.pointAtom / point.x overflow";

  if (!Number.isFinite(point[1])) throw "fn.pointAtom / point.y overflow";

  return point;
}

const preset = [
  [x1, y1],
  [x2, y2],
  [x3, y3],
  [x4, y4],
].map(([x, y]) => ({
  painter: "XY3",
  fn: pointAtom,
  x,
  y,
}));

// General Engine Control Settings
preset.frameRate = 60;
preset.background = 0;
preset.fullScreen = false;

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas) => {
  // canvas.rotate(PI);
};

preset.draw = ([[x1, y1], [x2, y2], [x3, y3], [x4, y4]], canvas, global) => {
  canvas.clear();

  canvas.noFill();

  // if (global.frameCount % mapping.length === 2) {
  canvas.stroke(mapping[global.frameCount % mapping.length]);
  canvas.strokeWeight(1);
  canvas.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  // }

  canvas.rotate((pow(-1, global.frameCount % 2) * 2 * PI) / walker());
};

export default preset;
