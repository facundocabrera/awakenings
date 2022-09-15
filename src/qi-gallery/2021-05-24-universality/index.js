import chroma from "chroma-js";

import { drawable, compose, branch } from "../../qi/flow";
import { hook, axis, pushPop } from "../../qi/drawlets";

import { RecurrentXn, RecurrentSin, RecurrentCos } from "./data";

const Center = () => {
  const setup = ({ dimensions: dim }) => {
    const {
      to: [width, height],
    } = dim;

    return {
      dimensions: {
        ...dim,
        center: [width / 2, height / 2],
      },
    };
  };

  return drawable(setup);
};

const Plot = (colorScale) => {
  let ui;
  let width;
  let heigth;

  const setup = ({ ctx, dimensions: { to, center } }) => {
    ui = ctx;
    width = to[0] - 20;
    heigth = to[1] - 20;
    origin = center;
  };

  const draw = ({ x, y }) => {
    ui.translate(...origin);

    ui.stroke(colorScale((x * y) / 2).hex());
    ui.fill(colorScale((x * y) / 3).hex());
    ui.strokeWeight(1);

    ui.ellipse(x * 200, y * -200, 4);
  };

  return pushPop(drawable(setup, draw));
};

const trunk = compose([Center(), axis()]);

const plotterA = Plot(chroma.scale(["#00E4FA", "#00A6AD"]).mode("lch"));
const plotterB = Plot(chroma.scale(["#FA007F", "#FA00B7"]).mode("lch"));
const plotterC = Plot(chroma.scale(["#8AEB00", "#306F00"]).mode("lch"));

const branchA = compose([RecurrentXn(4, 0.21), plotterA]);
const branchB = compose([RecurrentSin(4, 0.33), plotterB]);
const branchC = compose([RecurrentCos(2, 0.25), plotterC]);

export const skeleton = branch(trunk, branchA, branchB, branchC);

export const sketch = hook(skeleton, {
  frameRate: 60,
  width: 1080,
  height: 1080,
  background: "#212121",
});
