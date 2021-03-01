import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter, checkDrawable } from "../../qi/interfaces";

import { grid } from "../../qi-quad-grid";

import { centroid } from "../../geometry/vector";

import { builder } from "./2020-08-26-reusable";

export const GridLayout = (drawable, currentSlot) => {
  checkDrawable(drawable);

  switch (currentSlot) {
    case 0:
    case 1:
    case 2:
    case 3:
      break;
    default:
      throw "Invalid slot";
  }

  let ui;
  let center;

  const calculateCenterOfCurrentSlot = (from, to) => {
    let [topLeftCorner, , bottomRightCorner] = grid(from, to)[currentSlot];

    return centroid([topLeftCorner, bottomRightCorner]);
  };

  const setup = (props) => {
    const {
      ctx,
      dimensions: { from, to },
    } = props;

    ui = ctx;
    center = calculateCenterOfCurrentSlot(from, to);

    drawable.setup(props);
  };

  const draw = (props) => {
    ui.push();

    ui.translate(...center);
    drawable.draw(props);

    ui.pop();
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export const skeleton = ComposePainter([
  GridLayout(builder("#FF550033"), 0),
  GridLayout(builder("#00FF5533"), 1),
  GridLayout(builder("#F5F50033"), 2),
  GridLayout(builder("#00F5F533"), 3),
]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate: 30,
  })
);
