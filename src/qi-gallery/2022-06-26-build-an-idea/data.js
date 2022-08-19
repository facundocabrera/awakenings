import nj from "numjs";

import { checkDrawable } from "../../qi/interfaces";

const { log, PI } = Math;

const freq = (f) => (t) => (t * 2 * PI) / f;

const phi = (1 + Math.sqrt(5)) / 2;

const DataProvider = (drawable) => {
  checkDrawable(drawable);

  let signals;
  const setup = (props) => {
    drawable.setup(props);

    signals = [66, 105, 108, 144].map(freq);
  };

  const draw = (props) => {
    const { time } = props;

    const dt = time / 1000;

    const samples = signals.map((fn) => fn(dt));

    const trinity = signals
      .map((fn) => fn(dt) * phi)
      .reduce((accum, curr) => accum + curr, 0);

    drawable.draw({
      ...props,
      dt,
      samples,
      trinity,
    });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export { DataProvider };
