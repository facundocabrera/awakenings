import { zip } from "lodash";

import { compose, drawable, hook } from "../../qi/flow";
import { time, pushPop } from "../../qi/drawlets";

import store from "../../qi/store";

import { createDataProvider } from "./data";
import Controls, { getColorFrom, getColorTo } from "./controls";

export { store, Controls };

const getColorsFromParams = () => {
  const state = store.getState();

  return [getColorFrom(state), getColorTo(state)];
};

const WavesInspector = () => {
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

  const draw = (props) => {
    const { waves } = props;
    const colors = getColorsFromParams();

    ui.translate(...origin);

    zip(waves, colors).map(([point, color]) => {
      const [x, y] = point;

      ui.strokeWeight(4);
      ui.stroke(color);
      ui.point(x, y);
    });
  };

  return pushPop(drawable(setup, draw));
};

const data = drawable(
  undefined,
  createDataProvider({
    curves: [
      { freq: 1 / 4, radius: 100 },
      { freq: 1 / 4, radius: 100 },
    ],
    functions: [
      { freq: 1 / 5, radius: 600 },
      { freq: 1 / 5, radius: 600 },
    ],
    circularFreq: 1 / 360,
  })
);

export const skeleton = compose([time(), data, WavesInspector()]);

export const sketch = hook(skeleton);
