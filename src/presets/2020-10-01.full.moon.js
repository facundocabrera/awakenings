// El regreso de pitagoras.

import { Benford } from "../engine/benford";

const mapping = ["#DE00FF", "#ECF2FF", "#63FFFF", "#AB27FF", "#149EFF"];

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
// const steps = t => 1 * acc(t);
const steps = (t) => 12;
const freq = (t) => t * ((2 * Math.PI) / steps(t));

// Wave fn
const Ax = (t) => 500;
const Ay = (t) => 500;

const x = (t) => (Ax(t) * Math.pow(Math.sin(freq(t)), 2)) / Math.sqrt(t);
const y = (t) =>
  (Ay(t) * Math.pow(Math.sin(freq(t) + Math.PI / 4), 2)) / Math.sqrt(t);

const bfx = Benford();
const bfy = Benford();

// Point calculator
function fn(t) {
  const { x, y } = this;

  const point = [x(v(t)), y(v(t))];

  console.log(...point);

  bfx.add(Math.pow(point[0], 2));
  bfy.add(Math.pow(point[1], 2));

  if (bfx.obeyTheLaw()) console.log("bfx success");
  if (bfy.obeyTheLaw()) console.log("bfy success");

  // if (t % 10 === 0) {
  //   console.log('bfx diff', bfx.diff());
  //   console.log('bfy diff', bfy.diff());
  // }

  return point;
}

const preset = [1, 2].map((v, k) => ({
  painter: "XY2",
  fn,
  x,
  y,
  color: mapping[k],
  // angle: [0, 22.5, 45, 67.5, 90].map(v => v * Math.PI / 180)[k],
  angle: [0, 22.5].map((v) => (v * Math.PI) / 180)[k],
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
