import { drawable } from "../flow";

const { PI: pi, cos, sin, pow, abs, tan } = Math;

const oscillator = (freq = 0) => {
  const draw = ({ time: dt }) => {
    const time = abs(cos(2 * pi * dt * freq) / sin(2 * pi * dt * freq));
    // const time = tan(pi * dt * freq);

    return { time, hasEnded: false };
  };

  return drawable(undefined, draw);
};

export { oscillator };
