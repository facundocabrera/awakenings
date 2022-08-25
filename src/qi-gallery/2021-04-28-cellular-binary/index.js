import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";

import { DataProvider } from "./data";

const Plot = (color, color2) => {
  let ui;
  let width;
  let heigth;

  const setup = ({ ctx, dimensions: { to } }) => {
    ui = ctx;
    width = to[0];
    heigth = to[1];
  };

  const draw = ({ time, x, y }) => {
    ui.noFill();
    ui.stroke(color);
    ui.strokeWeight(1);

    const cycle = (time * 2 * Math.PI) / 144;

    const countUnos = (x) => x.filter((x) => x === 1).length;
    const countCeros = (x) => x.filter((x) => x === 0).length;

    const w = countUnos(x) + countCeros(y);
    const h = countUnos(y) + countCeros(x);

    const wf = width / Math.abs(w * Math.sin(cycle));
    const hf = heigth / Math.abs(h * Math.cos(cycle));

    ui.ellipse(wf, hf, (wf * hf) / (wf + hf));

    ui.ellipse(width - wf, heigth - hf, (wf - hf) / (wf + hf));

    // ui.stroke(color2);

    // ui.ellipse(
    //   width - wf,
    //   hf,
    //   (wf * hf) / (wf + hf)
    // );

    // ui.ellipse(
    //   wf,
    //   heigth - hf,
    //   (wf * hf) / (wf + hf)
    // );
  };

  return {
    setup,
    draw,
  };
};

const frameRate = 15;
const canvasSize = [1080, 1080];

export const skeleton = DataProvider(
  ComposePainter([Plot("#F500F533", "#00FFFF33")])
);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
