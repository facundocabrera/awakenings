// Presets should be able of create seveal painters and define a way of describe overlapping.

import { ln } from '../engine/frequency';

export default [
  {
    disabled: false,
    painter: 'SpiralV1', // create factory! 
    clock_unit: 1,
    draw: 'lines',
    waves: [
      {
          fn: ln,
          freq: 1/8,
          k: 1/12,
          w: 41,
          // phase: Math.PI / 2,
          // radius: 500
      },
      {
          fn: ln,
          freq: 1/8,
          k: 1/12,
          w: 41,
          phase: Math.PI / 3,
          // radius: 500
      },
    ],
    color: '#DDDDDD11',
    // rotate: Math.PI / -2
  },
  {
    disabled: false,
    painter: 'SpiralV1', // create factory! 
    clock_unit: 1,
    draw: 'bezier',
    waves: [
      {
          fn: ln,
          freq: 1/8,
          k: 1/10,
          w: 45,
          // phase: Math.PI / 2,
          // radius: 500
      },
      {
          fn: ln,
          freq: 1/8,
          k: 1/10,
          w: 45,
          phase: Math.PI / 11,
          // radius: 500
      },
    ],
    color: '#FAFAFA11',
    rotate: Math.PI / 2
  },
];