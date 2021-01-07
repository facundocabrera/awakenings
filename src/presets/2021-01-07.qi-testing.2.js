import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";

import { Canvas, ComposePainter, Painter } from "../qi/interfaces";
import { BaseLayer } from "../qi/base-layer";
import { Environment } from "../qi/sketch";

const ClearPainter = () => {
  function setup() {}

  function draw({ ui, time }) {
    if (time % 400 === 0) { ui.background('#000'); }
  }

  return Painter({
    setup,
    draw
  });
};

const GenericPainter = (xy, steps, shift, color) => {
  let ui;
  let vertex;

  function setup({ ctx }) {
    ui = ctx;
    vertex = multiByScalar(stops(steps, shift), 100);
  }

  function draw({ time }) {
    ui.push();

    ui.translate(...xy);
    ui.stroke(color);
    ui.noFill();

    vertex.forEach(p => {
      ui.ellipse(...p, time % 600);
    })

    ui.pop();
  }

  return Painter({
    setup,
    draw
  });
};

// Composable painters
export const skeleton = ComposePainter([
  ClearPainter(),
  GenericPainter([1080 / 2, 1080 / 2], 6, 0, '#FAE83733'),
  GenericPainter([1080 / 2, 1080 / 2], 3, 0, '#FFB02933'),
  // GenericPainter([1080 / 2, 1080 / 2], 9, 0, '#CCE32733')
]);

// Instanciation to be able to render the painters as a demo.
export const sketch = Environment(BaseLayer({
  ...Canvas(skeleton),
  frameRate: 60,
}));
