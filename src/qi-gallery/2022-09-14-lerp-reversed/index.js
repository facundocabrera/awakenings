import chroma from "chroma-js";
import { branch, compose, drawable } from "../../qi/flow";
import {
  time,
  pushPop,
  axis,
  hook,
  clearCanvas,
  memory,
  oscillator,
  stopWhen,
} from "../../qi/drawlets";
import store from "../../qi/store";

import { flipY } from "../../utils/render";
import { toText } from "../../utils/text";

import { sum } from "../../geometry/vector";
import { multiByScalar } from "../../geometry/scale";

import { bezier2d, lerp2d } from "../../bezier/lerp";

import Controls, { getColorFrom, getColorTo } from "./controls";
export { store, Controls };

import { RecurrentXn } from "../2021-05-24-universality/data";

const Configs = () => {
  const draw = () => {
    const state = store.getState();

    return { colors: [getColorFrom(state), getColorTo(state)] };
  };

  return drawable(undefined, draw);
};

const lipo = (a, b, t) => a * (1 - t) + b * t;
const ng = (x) => 4 * x * (1 - x);

const fn = (a, b, t) => {
  if (!fn.last) {
    fn.last = lipo(a, b, t);
  }

  fn.last = ng(fn.last * t) * lipo(a, b, t);

  return fn.last;
};

const fn2d = ([x, y], [z, w], t) => [fn(x, z, t), fn(y, w, t)];

const ComputeBezierLines = (guide) => {
  const lerpOn = (points, t) => {
    let index = 0;
    const computed = [];

    while (index < points.length - 1) {
      computed.push(fn2d(points[index], points[index + 1], t));
      index++;
    }

    return computed;
  };

  const setup = () => {};

  const draw = ({ time }) => {
    let layers = [
      lerpOn(guide, time), // layer 0
    ];

    while (true) {
      const nextLayer = lerpOn(layers[layers.length - 1], time);

      layers.push(nextLayer);

      if (nextLayer.length === 1) break;
    }

    return {
      lerp: {
        layers,
      },
    };
  };

  return drawable(setup, draw);
};

const DrawBezierLines = () => {
  let ui;
  let origin;

  const color = chroma.scale(["#F0EF53", "#8332FA"]).mode("lch");

  const setup = (props) => {
    const {
      ctx,
      dimensions: { center },
    } = props;

    ui = ctx;
    origin = center;
  };

  const draw = ({ lerp: { layers } }) => {
    ui.translate(...origin);

    // debugger;

    layers.map((points, index) => {
      const c = color(index / points.length).hex();

      return points.reduce((p1, p2) => {
        ui.stroke(c);
        ui.strokeWeight(1);
        ui.line(...flipY(p1), ...flipY(p2));

        ui.stroke(c);
        ui.noFill();
        ui.ellipse(...flipY(p1), 6);
        ui.ellipse(...flipY(p2), 6);
        return p2;
      });
    });
  };

  return pushPop(drawable(setup, draw));
};

const ComputeBezier = (guide) => {
  const draw = ({ time }) => {
    const point = bezier2d(guide, time);

    return {
      guide,
      point,
    };
  };

  return drawable(undefined, draw);
};

const MemoComputeBezier = () => {
  const name = "bpoints";
  const selector = ({ point }) => point;

  return memory(name, selector);
};

const DrawBPoints = () => {
  const name = "bpoints";
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

  const draw = ({ [name]: points, colors }) => {
    ui.translate(...origin);

    points.map((point) => {
      ui.strokeWeight(1);
      ui.stroke(colors[0]);
      ui.fill(colors[1]);
      ui.ellipse(...flipY(point), 8);
    });
  };

  return pushPop(drawable(setup, draw));
};

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

  const draw = ({ guide, point, colors }) => {
    ui.translate(...origin);

    guide.reduce((p1, p2) => {
      ui.strokeWeight(2);
      ui.stroke("#2E8BE8");
      ui.line(...flipY(p1), ...flipY(p2));

      ui.stroke("#33CEFF");
      ui.noFill();
      ui.ellipse(...flipY(p1), 6);
      ui.ellipse(...flipY(p2), 6);

      return p2;
    });

    ui.strokeWeight(1);
    ui.stroke(colors[0]);
    ui.fill(colors[1]);
    ui.ellipse(...flipY(point), 8);
  };

  return pushPop(drawable(setup, draw));
};

const AxisGuide = () => {
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

  const draw = () => {
    ui.translate(...origin);

    multiByScalar(
      [
        [1, 1],
        [1, -1],
        [-1, -1],
        [-1, 1],
      ],
      500
    ).map((point) => {
      ui.strokeWeight(4);
      ui.stroke("white");
      ui.point(...flipY(point));
      ui.noStroke();
      ui.fill("white");
      ui.text(toText(point), ...sum(flipY(point), [10, 4]));
    });
  };

  return pushPop(drawable(setup, draw));
};

const factor = 100;

const guide = multiByScalar(
  [
    [0, 0],
    [2, 2],
    [4, 0],
    [2, -2],
    [0, 0],
  ],
  factor
);

const guide2 = multiByScalar(
  [
    [0, 0],
    [-2, 2],
    [-4, 0],
    [-2, -2],
    [0, 0],
  ].reverse(),
  factor
);

const guide3 = multiByScalar(
  [
    [0, 0],
    [2, 2],
    [0, 4],
    [-2, 2],
    [0, 0],
  ],
  factor
);

const guide4 = multiByScalar(
  [
    [0, 0],
    [2, -2],
    [0, -4],
    [-2, -2],
    [0, 0],
  ].reverse(),
  factor
);

const trunk = compose([
  Configs(),

  time(0, 0.00001),
  // oscillator(1 / 10),
  stopWhen(({ time }) => time > 1),

  // clearCanvas(),

  axis(),
  AxisGuide(),
]);

const branchBezier = (guide) =>
  compose([
    ComputeBezier(guide),
    // MemoComputeBezier(),
    BezierRenderer(),
    // DrawBPoints(),
  ]);

const branchLines = (guide) =>
  compose([ComputeBezierLines(guide), DrawBezierLines()]);

export const skeleton = branch(
  trunk,
  // branchBezier(guide),
  branchLines(guide)
  // branchBezier(guide2),
  // branchLines(guide2),
  // branchBezier(guide3),
  // branchLines(guide3),
  // branchBezier(guide4),
  // branchLines(guide4)
);

export const sketch = hook(skeleton);
