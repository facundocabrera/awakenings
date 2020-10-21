import { Benford } from "../engine/benford";

const { PI, cos, sqrt, pow, atan, abs } = Math;

const mapping = [
  "#EDFF0013",
  // "#EC6E3211",
  // "#F4E72D11",
  // "#F400FF11",
  // "#74E2FE11",
  // "#7E3FFD11",
  // "#FFFFFF11",
];

const unity = 5;

const p1 = (step) => [unity * sqrt(step), 0];
const p2 = (step) => [unity * sqrt(step), unity * sqrt(step)];
const p3 = (step) => [unity * sqrt(step), unity * sqrt(step) + unity];

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  return [p1(t), p2(t), p3(t), t];
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

window.decimals = (v) => v.toFixed(7).split(".")[1];

const benforify = (ε) => {
  const trial = parseInt(decimals(ε), 10);

  debugger;

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

preset.draw = ([[p1, p2, p3, t]], canvas, global) => {
  canvas.noFill();

  // starts with 0 to use the colors as I want.
  canvas.stroke(mapping[(t - 1) % mapping.length]);
  canvas.strokeWeight(1);

  const α = -1 * atan(1);
  const β = -1 * atan((1 + sqrt(t)) / sqrt(1));

  // points
  canvas.beginShape();

  canvas.vertex(...p1);
  canvas.vertex(...p2);
  canvas.vertex(...p3);

  canvas.endShape(global.CLOSE);

  // translate and rotate to repeat the pattern easily
  canvas.translate(0, p2[1]);
  canvas.rotate((α + β) * sqrt(23));
};

export default preset;
