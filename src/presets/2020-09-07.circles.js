import { classicFrequencyMapping } from "../engine/frequency";

export default [
  {
    disabled: false,
    painter: "PlotterV1",
    clock_unit: 1,
    draw: "bezier",
    waves: [
      {
        fn: classicFrequencyMapping,
        freq: 1 / 89,
        radius: 500,
      },
      {
        fn: classicFrequencyMapping,
        freq: 1 / 89,
        phase: Math.PI / 2,
        radius: 500,
      },
      {
        fn: classicFrequencyMapping,
        freq: 1 / 89,
        phase: Math.PI,
        radius: 500,
      },
      {
        fn: classicFrequencyMapping,
        freq: 1 / 89,
        phase: (3 * Math.PI) / 2,
        radius: 500,
      },
    ],
    color: "#E6007E",
    // rotate: Math.PI / 2,
  },
];
