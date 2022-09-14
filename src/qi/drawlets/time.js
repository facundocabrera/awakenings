import { drawable } from "../flow";

const time = (value = 0, step = 1, restart = () => false) => {
  let timer;

  const setup = () => {
    timer = value;

    return { time: timer };
  };

  const draw = () => {
    const hasEnded = restart(timer);

    if (hasEnded) {
      timer = value;
    } else {
      timer += step;
    }

    return { time: timer, hasEnded };
  };

  return drawable(setup, draw);
};

export { time };
