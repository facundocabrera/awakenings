import { getRandomInt } from '../utils/random';

function spring(time) {
  const {
    A, k, m
  } = this;

  return [
    A * Math.cos( Math.sqrt( k / m ) * time ),
    A * Math.sin( Math.sqrt( k / m ) * time )
  ];
}

function springDecay(time) {
  const [ x, y ] = spring.apply(this, [time]);
  
  return [
    x * Math.exp(-1 * time),
    y * Math.exp(-1 * time)
  ];
}

// https://en.wikipedia.org/wiki/Hooke%27s_law
// Harmonic oscillator
function harmonicOscillator(time) {
  const { k, m, A } = this;

  const arc = 2 * Math.PI * time;
  
  const radius = getRandomInt(A);

  return [
    radius * Math.cos(arc),
    radius * Math.sin(arc)
  ];
}

export {
  spring,
  springDecay,
  harmonicOscillator
}