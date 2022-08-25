import { checkDrawable } from "../../qi/interfaces";

import { freqMapping, TWO_PI, HALF_PI } from "../../utils/waves";

const DataProvider = (drawable) => {
  checkDrawable(drawable);

  const setup = (props) => {
    drawable.setup(props);
  };

  const draw = (props) => {
    let { time } = props;

    // al empezar desde 1 me jode en la grafica
    time--;

    const centers = [
      { time, freq: 1 / 100, radius: 100 },
      { time, freq: 1 / 100, radius: 250, phase: HALF_PI / 2 },
      { time, freq: 1 / 300, radius: 360 },
    ].map(props => {
      const [x, y, arc] = freqMapping(props);

      return [x, y, arc];
    });

    const params = [
      { time, freq: 1 / 66, radius: 50 },
      { time, freq: 1 / 33, radius: 50 },
      { time, freq: 1 / 77, radius: 50 }
    ];

    const waves = params.map(({ time, freq, radius }) => [
      time, radius * Math.sin(TWO_PI * freq * time)
    ]);

    drawable.draw({
      ...props,
      centers,
      waves
    });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export { DataProvider };

