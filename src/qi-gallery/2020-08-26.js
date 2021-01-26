import { Canvas, ComposePainter, Painter } from "../qi/interfaces";
import { BaseLayer } from "../qi/base-layer";
import { Environment } from "../qi/sketch";

const { PI, cos, sin } = Math;

// polar coordinates
const polar = (arc, r) => [ r * cos(arc), r * sin(arc) ];

// frequency mapping
const fm = ({ time, freq, radius = 0 }) => polar(2 * PI * freq * time, radius);

const color = '#FF550033';

const GenericPainter = beArgs => {
  let ui;
  let w, h;

  function setup({ ctx, canvasWidth, canvasHeight }) {
    ui = ctx;
    w = canvasWidth;
    h = canvasHeight;
  }

  function draw({ time }) {
    // translate to the center of the canvas
    ui.translate(...[ w / 2, h / 2 ]);
    // rotate
    ui.rotate(PI / 2);

    // draw a bezier curve using the calculated frequency points
    ui.noFill();
    ui.stroke(color);
    ui.bezier(...beArgs(time));
  }

  return Painter({
    setup,
    draw,
  });
};

// Bezier curve arguments (4 pairs [x, y])
const points = time => [
  ...fm({ time, freq: 1/8, radius: 350 }),
  ...fm({ time, freq: 1/32, radius: 350 }),
  ...fm({ time, freq: 1/54, radius: 350 }),
  ...fm({ time, freq: 1/16, radius: 350 }),
];

export const skeleton = ComposePainter([
  GenericPainter(points),
]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate: 15,
  })
);
