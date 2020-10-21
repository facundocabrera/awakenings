// Kepler triangle
// https://en.wikipedia.org/wiki/Kepler_triangle#A_mathematical_coincidence

const { PI, cos, sqrt, pow, atan, abs, round } = Math;

// Golder ratios
const φ = (1 + sqrt(5)) / 2;
const ψ = (1 - sqrt(5)) / 2;

const mapping = ["#FFFA1211", "#57E78C11", "#FC61DD11"];

const unity = 10;

const p0 = (step) => [0, 0];
const p1 = (step) => [unity * sqrt(step), 0];
const p2 = (step) => [unity * sqrt(step), -1 * unity * sqrt(step)];
const p3 = (step) => [unity, -1 * unity];

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
  canvas.translate((3 * unity) / 2, unity / 2);
};

preset.draw = ([[p0, p1, p2, p3, t]], canvas, global) => {
  if (global.frameCount % 21) canvas.clear();

  const color = mapping[round(t) % mapping.length];

  canvas.noFill();
  canvas.stroke(color);
  canvas.strokeWeight(1);

  const ts = sqrt(t);

  // relacion tiempo y su raiz cuadrada
  // const α = -1 * atan(1 / ts);

  // rotacion golder ratio.
  const α = -1 * atan(φ);

  // Rotacion en spiral
  // const α = -1 * atan(1 / sqrt(t));

  canvas.rect(...p0, ...p2);
  canvas.rect(...p2, ...p3);

  canvas.circle(...p0, 2 * unity * sqrt(2 * t));

  // translate and rotate to repeat the pattern easily
  canvas.translate(0, p2[1]);
  canvas.rotate(α);
};

export default preset;
