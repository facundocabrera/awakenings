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

const move = (canvas, step) => {
  canvas.translate(0, -1 * (sqrt(step) * unity));

  console.log(step, atan(1 / sqrt(step)));

  canvas.rotate(-1 * atan((1 * unity) / (sqrt(step) * unity)));
};

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
preset.frameRate = 30;
preset.background = 0;
preset.fullScreen = true;
preset.time = 1;

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas) => {
  // canvas.rotate(PI);
};

preset.draw = ([[rect1, rect2, t]], canvas, global) => {
  console.log(rect1, rect2);

  canvas.noFill();

  canvas.stroke(mapping[t % mapping.length]);
  canvas.strokeWeight(1);

  // canvas.ellipse(0, 0, 5);

  canvas.ellipse(rect2[0], rect2[1], 5);

  // canvas.stroke('red');
  canvas.rect(...rect1);

  // canvas.stroke('blue');
  canvas.rect(...rect2);

  // canvas.line(rect1[0], rect1[1], rect2[2], rect2[3])

  // const d = global.dist(0, 0, rect2[2], rect2[3]);
  // canvas.ellipse(d/2, d/2, d);

  move(canvas, t);

  // console.log(global.frameCount);
};

export default preset;
