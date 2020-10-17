// Kepler triangle
// https://en.wikipedia.org/wiki/Kepler_triangle#A_mathematical_coincidence

const { PI, cos, sqrt, pow, atan, abs, round, asin, sin } = Math;

// Golder ratios
const φ = (1 + sqrt(5)) / 2;
const ψ = (1 - sqrt(5)) / 2;

const mapping = [
  '#FFFA1255',
  '#57E78C55',
  '#FC61DD55'
];

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  const {
    A
  } = this;

  const ts = sqrt(t);
  const x = A * cos(-1 * (atan(ts) + PI));
  const y = A * sin(atan(ts) + PI);

  return [[x, y], ts, t];
}

const preset = [
  {
    painter: "XY3",
    fn: pointAtom,
    A: 1
  },
  {
    painter: "XY3",
    fn: pointAtom,
    A: 450
  },
];

// General Engine Control Settings
preset.canvasSize = [1080,1080];
preset.fullScreen = false;

preset.frameRate = 60;
preset.background = '#000';
preset.time = 20000;

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas, global) => {
  global.noLoop();
};

preset.draw = (values, canvas, global) => {
  if (global.frameCount % 13) canvas.clear();

  const [ 
    [ [ x, y ], ts, time ],
    [ [ z, t ] ] 
  ] = values;

  const color = mapping[round(time) % mapping.length];

  canvas.noFill();
  canvas.stroke(color);
  canvas.strokeWeight(1);
    
  canvas.bezier(x, y, x + ts, y + ts, z + ts, t + ts, z, t);

  // canvas.circle(x, y, ts);
  // canvas.circle(z, t, ts);

  // canvas.rect(x,y,z,t);

  // ------------------------------------------------------------------------------------------------------------------- 
  // 👁👁
  // OBSERVAR EL COMPORTAMIENTO CUANDO TS TIENDE A SER EL DIVISOR. LO QUE SE VE EN EL DIBUJO ES QUE TIENDE A DAR UNA 
  // MEDIA VUELTA PUES ROTAMOS PI
  // 👁👁
  // -------------------------------------------------------------------------------------------------------------------

  canvas.rotate( sin( ts * 3 * PI / 2) * cos(ts * 3 * PI / 2) );
};

export default preset;