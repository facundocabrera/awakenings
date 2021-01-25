import { Canvas, ComposePainter, Painter } from "../qi/interfaces";
import { BaseLayer } from "../qi/base-layer";
import { Environment } from "../qi/sketch";

const GenericPainter = (xy) => {
  let ui;

  function setup({ ctx }) {
    ui = ctx;
  }

  function draw({ time }) {
    ui.push();

    ui.translate(...xy);
    ui.stroke("red");
    ui.ellipse(0, 0, time % 100);

    ui.pop();
  }

  return Painter({
    setup,
    draw,
  });
};

// Composable painters
export const skeleton = ComposePainter([
  GenericPainter([100, 100]),
  GenericPainter([300, 600]),
  GenericPainter([150, 600]),
]);

// Instanciation to be able to render the painters as a demo.
export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate: 15,
  })
);
