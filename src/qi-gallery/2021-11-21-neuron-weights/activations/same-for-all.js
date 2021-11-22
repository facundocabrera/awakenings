import { checkDrawable } from "../../../qi/interfaces";

const xn = (r) => (x) => r * x * (1 - x);

export const SameForAllProvider = (drawable) => {
  checkDrawable(drawable);

  const r = 4;
  const x0 = 0.0054;

  let clock;
  let x1;

  const setup = (props) => {
    clock = xn(r);
    x1 = clock(x0);

    drawable.setup(props);
  };

  const draw = (props) => {
    x1 = clock(x1);

    drawable.draw({
      ...props,
      activation: () => x1,
    });
  };

  return {
    setup,
    draw,
  };
};
