const PI = Math.PI;

const mapping = ["#E8F3F4", "#CE4A97", "#3534C3", "#95D637"];

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

const xAtom = (f) => (t) => Ax(t) * Math.sin(f(t));
const yAtom = (f) => (t) => Ay(t) * Math.cos(f(t));
const zeroAtom = () => 0;

const x1 = zeroAtom;
const y1 = zeroAtom;

const x2 = xAtom(freqAtom(12));
const y2 = yAtom(freqAtom(12));

const x3 = xAtom(freqAtom(12, Math.PI / 6));
const y3 = yAtom(freqAtom(12, Math.PI / 6));

const x4 = zeroAtom;
const y4 = zeroAtom;

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
preset.frameRate = 1;
preset.background = 0;
preset.fullScreen = false;

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas) => {
  // canvas.noFill();
  // canvas.stroke('red');
  // canvas.ellipse(0, 0, 1000);
};

preset.draw = ([[x1, y1], [x2, y2], [x3, y3], [x4, y4]], canvas) => {
  canvas.noFill();

  [
    [x1, y1],
    [x2, y2],
    [x3, y3],
    [x4, y4],
  ].map(([x, y], k) => {
    canvas.stroke(mapping[k]);
    canvas.strokeWeight(2);
    canvas.ellipse(x, y, 10);
  });

  canvas.stroke(mapping[3]);
  canvas.strokeWeight(1);
  canvas.bezier(x1, y1, x2, y2, x3, y3, x4, y4);

  // canvas.rotate(PI / 3);
};

export default preset;
