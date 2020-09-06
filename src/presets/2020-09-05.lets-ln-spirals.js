

import { ln, kepler2 } from '../engine/frequency';

export default [
  {
    disabled: false,
    painter: 'SpiralV1',
    draw: 'bezier',
    stop1: [-400, 0],
    stop2: [400, 0],
    waves: [
      {
          fn: ln,
          freq: 1/160,
          k: 1/16,
          w: 16,
          phase: Math.PI / -2,
      },
      {
          fn: kepler2,
          freq: 1/640,
          e: 0.3,
          phase: Math.PI / 4,
          radius: 300
      },
    ],
    color: '#AA99FF11',
    // rotate: 2 * Math.PI / 3
  }
];