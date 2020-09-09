// do not forget to keep the balance.

import { 
  classicFrequencyMapping,
  ln,
  archimedean
} from "../engine/frequency";

export default [
  {
    disabled: false,
    painter: "PlotterV1",
    clock_unit: 1,
    draw: "bezier",
    waves: [
      {
        fn: classicFrequencyMapping,
        freq: 1/32,
        // phase: Math.PI,
        radius: 500,
      },
      {
        fn: archimedean,
        a: 50, 
        b: 1/12,
        c: 1,
        freq: 1/33, 
        phase: 0,
      },
      {
        fn: archimedean,
        a: 50, 
        b: 1/12, 
        c: 1,
        freq: -1/33, 
        phase: 0,
      },
      {
        fn: classicFrequencyMapping,
        freq: 1/32,
        phase: Math.PI / 2,
        radius: 500,
      },
    ],
    color: "#E4214411",
    rotate: Math.PI / -2,
  },
];
