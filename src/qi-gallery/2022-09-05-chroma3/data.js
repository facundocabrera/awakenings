import { freqMapping, TWO_PI } from "../../utils/waves";

import store from "../../qi/store";
import { getP1, getP2 } from "./controls";

const createDataProvider =
  ({ curves, functions, circularFreq }) =>
  (props) => {
    const { time } = props;

    const state = store.getState();
    const p1 = getP1(state);
    const p2 = getP2(state);

    const centers = curves.map((props) => {
      const [x, y, arc] = freqMapping({ ...props, time });

      return [x, y, arc];
    });

    const waves = functions.map(({ freq, radius }) => [
      time,
      (radius / p1) * Math.sin((TWO_PI / p2) * freq * time),
    ]);

    const circularWaves = waves.map(([time, radius]) =>
      freqMapping({ time, radius, freq: circularFreq })
    );

    return {
      centers,
      waves,
      circularWaves,
    };
  };

export { createDataProvider };
