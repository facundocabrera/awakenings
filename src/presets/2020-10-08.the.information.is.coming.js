const { 
  PI,
  cos,
  sqrt,
  pow,
  atan,
  abs
} = Math;

const mapping = ["#B9977811", "#F4D8C311", "#D37A3C11", "#F7FDF911"];

const unity = 10;

const r1 = (step) => ([
  0, 0, 
  sqrt(step) * unity, -1* unity * sqrt(step)
]);

const r2 = (step) => ([
  sqrt(step) * unity, -1 * sqrt(step) * unity, 
  unity * sqrt(step), -1 * unity * sqrt(step)
]);

const move = (canvas, step) => {
  canvas.translate( 0, -1 * (sqrt(step) * unity));

  // Math.atan2( unity, sqrt(step) * unity )

  canvas.rotate( -1 * PI * sqrt(step));
}

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  const squares = [
    r1(t),
    r2(t),
    t
  ];

  return squares;
}

const preset = [
{
  painter: "XY3",
  fn: pointAtom,
}];

// General Engine Control Settings
preset.frameRate = 30;
preset.background = 0;
preset.fullScreen = true;
preset.time = 100;

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas) => {
  // canvas.rotate(PI);
};

preset.draw = ([ [ rect1, rect2, t ] ], canvas, global) => {  
  console.log(rect1, rect2);

  canvas.noFill();

  canvas.stroke(mapping[global.frameCount % mapping.length]);
  canvas.strokeWeight(1);

  canvas.ellipse(0, 0, 5);

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
