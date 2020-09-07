import { ln } from "../engine/frequency";

export default [
  {
    disabled: false,
    painter: "SpiralV1",
    draw: "lines",
    waves: [
      {
        fn: ln,
        freq: 1 / 8,
        k: 1 / 12,
        w: 41,
      },
      {
        fn: ln,
        freq: 1 / 8,
        k: 1 / 12,
        w: 41,
        phase: Math.PI / 3,
      },
    ],
    color: "#F8ABBA11",
  },
  {
    disabled: false,
    painter: "SpiralV1",
    clock_unit: 1,
    draw: "bezier",
    stop1: [-400, -400],
    stop2: [400, 400],
    waves: [
      {
        fn: ln,
        freq: 1 / 8,
        k: 1 / 10,
        w: 45,
      },
      {
        fn: ln,
        freq: 1 / 8,
        k: 1 / 10,
        w: 45,
        phase: Math.PI / 11,
      },
    ],
    color: "#E6007E11",
    rotate: Math.PI / 2,
  },
];
