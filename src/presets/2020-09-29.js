// Keep pushing hard.

// https://www.quantamagazine.org/when-magic-is-seen-in-twisted-graphene-thats-a-moire-20190620/
// https://www.quantamagazine.org/how-to-create-art-with-mathematics-20151008/

const mapping = [
  "#DE000433",
  "#ECF20E33",
  "#63FF0733",
  "#AB27EF33",
  "#149EEF33",
];

// Acceleration examples
// Pensar la aceleracion como la responsable de controlar la velocidad en el tiempo.
// Podemos tener aceleracion constante, o variable, usa la imaginacion.
const fixedAcc = (t) => 1;
const oscillationAcc = (t) => Math.cos(t * ((2 * Math.PI) / 144));
const decayAcc = (t) => Math.exp(t / 75 - 5);

// Velocity / Controlo la velocidad del tiempo
const acc = (t) => fixedAcc(t);
const v = (t) => t * acc(t);

// Freq mapping / Si accelero tengo que aumentar el muestreo
const steps = (t) => 1008 * acc(t);
const freq = (t) => t * ((2 * Math.PI) / steps(t));

// Wave fn
const Ax = (t) => 7 * 500;
const Ay = (t) => 7 * 500;

const x = (t) => (Ax(t) * Math.sin(freq(t))) / Math.sqrt(t);
const y = (t) => (Ay(t) * Math.cos(freq(t))) / Math.sqrt(t);

// Point calculator
function fn(t) {
  const { x, y } = this;

  const point = [x(v(t)), y(v(t))];

  return point;
}

const preset = [1, 2, 3, 4, 5].map((v, k) => ({
  painter: "XY2",
  fn,
  x,
  y,
  color: mapping[k],
  angle: [0, 22.5, 45, 67.5, 90].map((v) => (v * Math.PI) / 180)[k],
  fill: true,
  rad: 7,
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

preset.before = (canvas) => {
  canvas.clear();
};

export default preset;
