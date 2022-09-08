import { drawable } from "../flow";

const tick = (value = 0, step = 1) => {
  let timer;

  const setup = () => {
    timer = value;

    return { time: timer };
  };

  const draw = () => {
    timer += step;

    return { time: timer };
  };

  return drawable(setup, draw);
};

export default tick;
