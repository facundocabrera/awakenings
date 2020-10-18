//
// https://en.wikipedia.org/wiki/Binomial_distribution
// https://en.wikipedia.org/wiki/Bean_machine
// https://en.wikipedia.org/wiki/Normal_distribution
// https://en.wikipedia.org/wiki/Hypergeometric_distribution
// https://en.wikipedia.org/wiki/Law_of_large_numbers
// 

import range from 'lodash/range';

import { walker } from '../random-walk/benford-walker';
import { getRandomInt } from '../utils/random';

const { PI, cos, sqrt, pow, atan, abs, round, asin, sin, floor } = Math;

const mapping = [
  '#FFFA1211',
  '#57E78C11',
  '#FC61DD11',
  '#FFFFFF11'
];

const radius = 5;

const xen = (steps, radius) => 
  range(steps)
    .map(p => p * 2 * PI / steps)
      .map(θ => [radius * cos(θ), radius * sin(θ)]);

const centroids = xen(9, radius);

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  const w = getRandomInt(9);

  return [
    centroids[w % centroids.length],
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

preset.frameRate = 60;
preset.background = '#000';
preset.time = 1;

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas, global) => {
  global.noLoop();
};

preset.draw = (evaluations, canvas, global) => {
  canvas.clear();
  canvas.noFill();
  
  const [ [ centroid, t ] ] = evaluations;
  
  // canvas.push();
  canvas.translate(...centroid);
  
  centroids.forEach((c, i) => {
    canvas.stroke(mapping[1]);
    canvas.ellipse(...c, radius);
  });
  // canvas.pop();
};

export default preset;