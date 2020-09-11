/* BE POSSITIVE - YOUR ATTENTION IS EVERYTHING */

const r = 500;

export default [
  {
    disabled: true,
    waves: [
      {
        fn: kepler,
        freq: 1 / 5,
        //             phase: Math.PI / 2,
        radius: 500,
      },
      {
        fn: kepler,
        freq: 1 / -5,
        //             phase: Math.PI / 2,
        radius: 500,
      },
      {
        fn: kepler,
        freq: 1 / 45,
        //             phase: Math.PI / 2,
        radius: 500,
      },
      {
        fn: kepler,
        freq: 1 / -45,
        //             phase: Math.PI / 2,
        radius: 500,
      },
    ],
    rotate: Math.PI / 2,
    color: "#FFAAFF11",
  },
  {
    disabled: true,
    waves: [
      {
        fn: kepler,
        freq: 1 / 5,
        phase: Math.PI * 3,
        radius: 300,
      },
      {
        fn: kepler,
        freq: 1 / -5,
        phase: Math.PI * 3,
        radius: 500,
      },
      {
        fn: kepler,
        freq: 1 / 25,
        phase: Math.PI * 3,
        radius: 300,
      },
      {
        fn: kepler,
        freq: 1 / -25,
        phase: Math.PI * 3,
        radius: 500,
      },
    ],
    rotate: Math.PI / 2,
    color: "#DDFFFF11",
  },
  {
    disabled: true,
    waves: [
      {
        fn: kepler,
        freq: 1 / 11,
        phase: Math.PI * 3,
        radius: 300,
      },
      {
        fn: kepler,
        freq: 1 / -11,
        phase: Math.PI * 3,
        radius: 500,
      },
      {
        fn: kepler,
        freq: 1 / 54,
        phase: Math.PI * 3,
        radius: 300,
      },
      {
        fn: kepler,
        freq: 1 / -54,
        phase: Math.PI * 3,
        radius: 500,
      },
    ],
    rotate: Math.PI / 2,
    color: "#EEFFFF11",
  },
  {
    waves: [
      {
        fn: kepler,
        freq: 1 / 5,
        phase: Math.PI * 7,
        radius: r - Math.log10(1) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -5,
        phase: Math.PI * 7,
        radius: r,
      },
      {
        fn: kepler,
        freq: 1 / 15,
        phase: Math.PI * 7,
        radius: r - Math.log10(1) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -45,
        phase: Math.PI * 7,
        radius: r,
      },
    ],
    rotate: Math.PI / 2,
    color: "#7E81FF11",
  },
  {
    waves: [
      {
        fn: kepler,
        freq: 1 / 5,
        phase: Math.PI * 6,
        radius: r - Math.log10(2) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -5,
        phase: Math.PI * 6,
        radius: r,
      },
      {
        fn: kepler,
        freq: 1 / 15,
        phase: Math.PI * 6,
        radius: r - Math.log10(2) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -45,
        phase: Math.PI * 6,
        radius: r,
      },
    ],
    rotate: Math.PI / 2,
    color: "#EA37ED11",
  },
  {
    waves: [
      {
        fn: kepler,
        freq: 1 / 5,
        phase: Math.PI * 5,
        radius: r - Math.log10(0.7) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -5,
        phase: Math.PI * 5,
        radius: r,
      },
      {
        fn: kepler,
        freq: 1 / 15,
        phase: Math.PI * 5,
        radius: r - Math.log10(0.7) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -45,
        phase: Math.PI * 5,
        radius: r,
      },
    ],
    color: "#1838F311",
    rotate: Math.PI / 2,
  },

  {
    waves: [
      {
        fn: kepler,
        freq: 1 / 5,
        phase: Math.PI * 4,
        radius: r - Math.log10(0.4) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -5,
        phase: Math.PI * 4,
        radius: r,
      },
      {
        fn: kepler,
        freq: 1 / 15,
        phase: Math.PI * 4,
        radius: r - Math.log10(0.4) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -45,
        phase: Math.PI * 4,
        radius: r,
      },
    ],
    color: "#39C23111",
    rotate: Math.PI / 2,
  },
  {
    waves: [
      {
        fn: kepler,
        freq: 1 / 5,
        phase: Math.PI * 3,
        radius: r - Math.log10(0.5) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -5,
        phase: Math.PI * 3,
        radius: r,
      },
      {
        fn: kepler,
        freq: 1 / 15,
        phase: Math.PI * 3,
        radius: r - Math.log10(0.5) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -45,
        phase: Math.PI * 3,
        radius: r,
      },
    ],
    color: "#EEf35511",
    rotate: Math.PI / 2,
  },
  {
    waves: [
      {
        fn: kepler,
        freq: 1 / 5,
        phase: Math.PI * 2,
        radius: r - Math.log10(0.6) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -5,
        phase: Math.PI * 2,
        radius: r,
      },
      {
        fn: kepler,
        freq: 1 / 15,
        phase: Math.PI * 2,
        radius: r - Math.log10(0.6) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -45,
        phase: Math.PI * 2,
        radius: r,
      },
    ],
    rotate: Math.PI / 2,
    color: "#D8563711",
  },
  {
    waves: [
      {
        fn: kepler,
        freq: 1 / 5,
        phase: Math.PI,
        radius: r - Math.log10(0.7) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -5,
        phase: Math.PI,
        radius: r,
      },
      {
        fn: kepler,
        freq: 1 / 15,
        phase: Math.PI,
        radius: r - Math.log10(0.7) * 100,
      },
      {
        fn: kepler,
        freq: 1 / -45,
        phase: Math.PI,
        radius: r,
      },
    ],
    rotate: Math.PI / 2,
    color: "#E4002A11",
  },
];
