// Keep pushing hard.

// https://www.quantamagazine.org/when-magic-is-seen-in-twisted-graphene-thats-a-moire-20190620/
// https://www.quantamagazine.org/how-to-create-art-with-mathematics-20151008/

const mapping = [
  '#DE000455',
  '#ECF20E55',
  "#63FF0755",
  '#AB27EF55', 
  '#149EEF55'
];

// Acceleration examples
// Pensar la aceleracion como la responsable de controlar la velocidad en el tiempo.
// Podemos tener aceleracion constante, o variable, usa la imaginacion.
const fixedAcc = t => 1;
const oscillationAcc = t => Math.cos( t * (2 * Math.PI / 144) );
const decayAcc = t => Math.exp( t / 75 - 5 );

// Velocity / Controlo la velocidad del tiempo
const acc = t => fixedAcc(t);
const v = t => t * acc(t);

// Freq mapping / Si accelero tengo que aumentar el muestreo
const steps = t => 144 * acc(t);
const freq = t => t * (2 * Math.PI / steps(t));

// Wave fn
const A = 700;
const x = t => 3 * t;
const y = t => A * Math.pow( Math.cos(freq(t)) , 2 );

const x2 = t => 5 * t;
const y2 = t => A * Math.pow( Math.sin(freq(t)) , 2 );

// Point calculator
function fn(t) {
  const {
    x, 
    y
  } = this;

  const point = [ x( v(t) ), y( v(t) ) ];

  return point;
}

const preset = [
  {
    painter: "XY2",
    fn, x, y,
    color: mapping[0],
    angle: 0,
    fill: false,
    rad: 5
  },
  {
    painter: "XY2",
    fn, x: x2, y: y2,
    color: mapping[1],
    angle: 0,
    fill: false,
    rad: 5
  },
];

// General Engine Control Settings
preset.frameRate = 30;
preset.background = 0;
preset.fullScreen = true;

export default preset;
