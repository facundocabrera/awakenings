import { drawable } from "../flow";

const stopWhen = (endOfHistory = () => false) => {
  let p5js;

  const setup = ({ ctx }) => {
    p5js = ctx;
  };

  const draw = (props) => {
    if (endOfHistory(props)) p5js.noLoop();
  };

  return drawable(setup, draw);
};

export { stopWhen };
