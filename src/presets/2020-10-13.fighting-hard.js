import { Benford } from "../engine/benford";

const { PI, cos, sqrt, pow, atan, abs } = Math;

const mapping = [
  // "#EDFF0013",
  // "#EC6E3211",
  // "#F4E72D11",
  "#F400FF11",
  "#74E2FE11",
  "#7E3FFD11",
  // "#FFFFFF11",
];

const unity = 10;

const p0 = (step) => [0, 0];
const p1 = (step) => [unity * sqrt(step), 0];
const p2 = (step) => [unity * sqrt(step), unity * sqrt(step)];
const p3 = (step) => [unity * sqrt(step), unity * sqrt(step) + unity];

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  return [p0(t), p1(t), p2(t), p3(t), t];
}

const preset = [
  {
    painter: "XY3",
    fn: pointAtom,
  },
];

// General Engine Control Settings
preset.canvasSize = [1080, 1080];
preset.fullScreen = false;

preset.frameRate = 60;
preset.background = "#131313";
preset.time = 1;

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas, global) => {
  global.noLoop();
  canvas.translate((-1 / 2) * unity, (1 / 2) * unity);
};

const round = (v) => v.toFixed(2);
const decimals = (v) => v.toFixed(7).split(".")[1];

const benforify = (ε) => {
  const trial = parseInt(decimals(ε), 10);

  if (trial < 20) return 1;
  if (trial < 30) return 2;
  if (trial < 40) return 3;
  if (trial < 50) return 4;
  if (trial < 60) return 5;
  if (trial < 70) return 6;
  if (trial < 80) return 7;
  if (trial < 90) return 8;
  if (trial < 100) return 9;
};

const ben = Benford();

preset.draw = ([[p0, p1, p2, p3, t]], canvas, global) => {
  if (t % 14 === 0) canvas.clear();

  const color = mapping[(t - 1) % mapping.length];

  canvas.fill(color);
  canvas.stroke(color);
  canvas.strokeWeight(1);

  // relacion tiempo y su raiz cuadrada
  const α = atan(t / sqrt(t));

  // rotacion golder ratio.
  // const α = -1 * atan((1 + sqrt(5)) / 2);

  // Rotacion en spiral
  // const α = -1 * atan(1 / sqrt(t));

  canvas.bezier(...p3, ...p2, ...p1, ...p0);

  // translate and rotate to repeat the pattern easily
  canvas.translate(0, p2[1]);
  canvas.rotate(α);
};

export default preset;
