import { checkDrawable } from "../../qi/interfaces";

import { freqMapping, TWO_PI } from "../../utils/waves";

const DataProvider = (drawable, { curves, functions }) => {
  checkDrawable(drawable);

  const setup = (props) => {
    drawable.setup(props);
  };

  const draw = (props) => {
    let { time } = props;

    // al empezar desde 1 me jode en la grafica
    time--;

    const centers = curves.map((props) => {
      const [x, y, arc] = freqMapping({ ...props, time });

      return [x, y, arc];
    });

    const waves = functions.map(({ freq, radius }) => [
      time,
      radius * Math.sin(TWO_PI * freq * time),
    ]);

    drawable.draw({
      ...props,
      centers,
      waves,
    });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export { DataProvider };
