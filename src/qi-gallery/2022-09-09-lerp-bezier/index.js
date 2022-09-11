import { compose, drawable } from "../../qi/flow";
import { time, pushPop, axis, hook, stopWhen } from "../../qi/drawlets";

import store from "../../qi/store";

import { bezier2d } from "../../bezier/lerp";

import Controls, { getColorFrom, getColorTo } from "./controls";

export { store, Controls };

/**
 * Computation
 */
const Configs = () => {
  const draw = () => {
    const state = store.getState();

    return { colors: [getColorFrom(state), getColorTo(state)] };
  };

  return drawable(undefined, draw);
};

/**
 * Computation
 */
const ComputeBezier = () => {
  // BEZIER POINTS
  const guide = [
    [0, 0],
    [100, 100],
    [200, 0],
    [300, -100],
    [400, 0],
  ];

  const draw = ({ time }) => {
    const point = bezier2d(guide, time);

    return {
      guide,
      point,
    };
  };

  return drawable(undefined, draw);
};

/**
 * Renderer
 */
const BezierRenderer = () => {
  let ui;
  let origin;

  const setup = (props) => {
    const {
      ctx,
      dimensions: { center },
    } = props;

    ui = ctx;
    origin = center;
  };

  function plotPoint(c) {
    return (point) => {
      const [x, y] = point;

      ui.strokeWeight(4);
      ui.stroke(c);
      ui.point(x, -y);
    };
  }

  const draw = ({ guide, point, colors }) => {
    ui.translate(...origin);

    guide.map(plotPoint('white'));

    [point].map(plotPoint(colors[0]));
  };

  return pushPop(drawable(setup, draw));
};

export const skeleton = compose([
  Configs(),
  time(0, 0.01),
  stopWhen(({ time }) => time > 1),
  axis(),
  ComputeBezier(),
  BezierRenderer(),
]);

export const sketch = hook(skeleton);
