const { PI, cos, sqrt, pow, atan, abs } = Math;

const mapping = [
  "#EC1D06",
  "#EC6E32",
  "#F4E72D",
  "#F400FF",
  "#74E2FE",
  "#7E3FFD",
  "#FFFFFF",
];

const unity = 10;

const r1 = (step) => [0, 0, unity * sqrt(step), -1 * unity * sqrt(step)];

// const r2 = (step) => ([
//   sqrt(step) * unity, -1 * sqrt(step) * unity,
//   unity * sqrt(step), -1 * unity * sqrt(step)
// ]);

const r2 = (step) => [
  sqrt(step) * unity,
  -1 * sqrt(step) * unity,
  unity,
  -1 * unity,
];

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  const squares = [r1(t), r2(t), t];

  return squares;
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

preset.frameRate = 30;
preset.background = 0;
preset.time = 1;
preset.scale = 1;

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas, global) => {
  global.noLoop();
  canvas.scale(preset.scale);
};

preset.draw = ([[rect1, rect2, t]], canvas, global) => {
  canvas.noFill();

  // starts with 0 to use the colors as I want.
  canvas.stroke(mapping[(t - 1) % mapping.length]);
  canvas.strokeWeight(1);

  // draw rectangles
  canvas.rect(...rect1);
  canvas.rect(...rect2);

  // translate and rotate to repeat the pattern easily
  canvas.translate(0, -1 * (sqrt(t) * unity));
  canvas.rotate(-1 * atan(1 / sqrt(t)));
};

export default preset;
