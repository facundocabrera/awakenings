const {
  random
} = Math;

import sum from 'lodash/sum';

const benford = [1,2,3,4,5,6,7,8,9].map(d => Math.log10(1 + 1 / d));

function produceAccum (distribution) {
  const accum = [];
  for (let i = 1; i < distribution.length; i++) {
    accum.push( sum( distribution.slice(0, i) ) );
  }

  return [...accum, 1];
}

const acc = produceAccum(benford);

function walker() { 
  const n = random();

  for (let i = 0; i < acc.length; i++) {
    if (n < acc[i]) {
      return i+1;
    }
  }

  return 9;
}

export {
  walker
};