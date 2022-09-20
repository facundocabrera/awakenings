import { drawable } from "../../qi/flow";

import { lerp2d } from "../../bezier/lerp";

const logisticMap = (r, x) => r * x * (1 - x);
const logicticMap2D = ([r1, x], [r2, y]) => [
  logisticMap(r1, x),
  logisticMap(r2, y),
];

const DataProvider = (r1, x0, r2, y0) => {
  // initial values
  let x = logisticMap(r1, x0);
  let y = logisticMap(r2, y0);

  const draw = ({ time }) => {
    const [a, b] = logicticMap2D([r1, x], [r2, y]);
    const [c, d] = logicticMap2D([r1, a], [r2, b]);

    x = a;
    y = b;

    return { point: lerp2d([a, b], [c, d], time) };
  };

  return drawable(undefined, draw);
};

export default DataProvider;
