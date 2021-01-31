import { Canvas, ComposePainter, Painter } from "../qi/interfaces";
import { BaseLayer } from "../qi/base-layer";
import { Environment } from "../qi/sketch";

import { Sequencer } from "../qi-quad-grid/sequencer";

export const GenericPainter = (color) => {
  let ui;
  let w, h;

  let quad;

  function setup({ ctx, dimensions: { to: [ canvasWidth, canvasHeight ] } }) {
    ui = ctx;
    w = canvasWidth;
    h = canvasHeight;

    quad = Sequencer([10, 10], [w - 10, h - 10]);
  }

  function draw() {
    ui.noFill();
    ui.stroke(color);
    ui.strokeWeight(2);

    const points = quad.next().value;

    ui.beginShape();
    points.forEach((p) => ui.vertex(...p));
    ui.endShape(ui.CLOSE);
  }

  return Painter({
    setup,
    draw,
  });
};

export const skeleton = ComposePainter([GenericPainter("#FF550033")]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate: 30,
  })
);
