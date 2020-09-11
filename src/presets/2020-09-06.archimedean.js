import { 
  kepler2, 
  archimedean,
  classicFrequencyMapping2
} from "../engine/frequency";

export default [
  {
    disabled: false,
    painter: "SpiralV1",
    clock_unit: 0.1,
    draw: "bezier",
    stop1: [0, 500],
    stop2: [500, 0],
    waves: [
      {
        fn: archimedean,
        a: Math.PI,
        b: 1,
        c: 1, 
        freq: 1/5, 
        // phase: Math.PI / 3
      },
      {
        fn: archimedean,
        a: -1 * Math.PI,
        b: 1,
        c: 1, 
        freq: 1/5, 
        // phase: Math.PI / 3
      },
    ],
    color: "#E6007E11",
    // rotate: Math.PI / 2,
  },
  {
    disabled: false,
    painter: "SpiralV1",
    clock_unit: 0.1,
    draw: "bezier",
    stop1: [0, -500],
    stop2: [-500, 0],
    waves: [
      {
        fn: archimedean,
        a: Math.PI,
        b: 1,
        c: 1, 
        freq: 1/5, 
        // phase: Math.PI / 3
      },
      {
        fn: archimedean,
        a: -1 * Math.PI,
        b: 1,
        c: 1, 
        freq: 1/5, 
        // phase: Math.PI / 3
      },
    ],
    color: "#E6007E11",
    // rotate: Math.PI / 2,
  },
];
