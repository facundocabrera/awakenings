import { checkDrawable } from "../../qi/interfaces";

import { sum_vector, modulo } from "../../geometry/vector";

const { cos, sin, PI, exp, pow, log } = Math;

/**
 * Calculate points on the circle with a given frecuency.
 */
const FN = (A, magic_constant) => {
  // step size on the circle
  const unit = 1 / PI;

  // elastic constant
  const e = log(magic_constant);

  // calculate the point on the circle with a given frecuency
  return (t) => {
    const value = unit * e * t;

    return [A * exp(cos(value)), A * exp(sin(value))];
  };
};

const Zip = (providers, drawable) => {
  checkDrawable(drawable);

  const setup = (props) => {
    drawable.setup(props);
  };

  const draw = (props) => {
    const { time } = props;

    const radius = modulo(...sum_vector(providers.map((f) => f(time / 54))));

    drawable.draw({
      ...props,
      radius,
    });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export { FN, Zip };
