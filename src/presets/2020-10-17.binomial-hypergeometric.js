//
// https://en.wikipedia.org/wiki/Binomial_distribution
// https://en.wikipedia.org/wiki/Bean_machine
// https://en.wikipedia.org/wiki/Normal_distribution
// https://en.wikipedia.org/wiki/Hypergeometric_distribution
// https://en.wikipedia.org/wiki/Law_of_large_numbers
// 

import range from 'lodash/range';

import { walker  } from '../random-walk/benford-walker';
import { getRandomInt } from '../utils/random';
import { benfordWalkerN } from '../random-walk/benford-walker-n';

const { PI, cos, sqrt, pow, atan, abs, round, asin, sin, floor } = Math;

const mapping = [
  '#FFFA12',
  '#57E78C',
  '#FC61DD',
  '#FFFFFF'
];

const stops = 3;
const radius = 100;

const xen = (steps, radius) => 
  range(steps)
    .map(p => p * 2 * PI / steps)
      .map(θ => [radius * cos(θ) / 2, radius * sin(θ) / 2]);

const centroids = xen(stops, radius);

// const random = benfordWalkerN(stops + 1);

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  // const w = random();

  return [
    centroids[t % centroids.length],
    t
  ];
}

const preset = [
  {
    painter: "XY3",
    fn: pointAtom
  },
];

// General Engine Control Settings
preset.canvasSize = [1080,1080];
preset.fullScreen = false;

preset.frameRate = 1;
preset.background = '#000';
preset.time = 1;

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas, global) => {
  // global.noLoop();
};

preset.draw = (evaluations, canvas, global) => {
  canvas.clear();
  canvas.noFill();

  canvas.stroke('white');
  canvas.ellipse(0,0,radius);

  const [ [ [x, y], t ] ] = evaluations;
  
  // canvas.push();
  // canvas.translate(...centroid);
  
  canvas.stroke(mapping[1]);

  centroids.forEach(([w,z], i) => {
    canvas.ellipse(...[x + w, y + z], radius);
  });
  // canvas.pop();
};

export default preset;