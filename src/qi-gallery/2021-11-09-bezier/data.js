/**
 * The Beauty of Bézier Curves
 * https://www.youtube.com/watch?v=aVwxzDHniEw
 */
import { checkDrawable } from "../../qi/interfaces";
import { p } from "../../bezier/lerp";

const xn = (r) => (x) => r * x * (1 - x);

const DataProvider = (drawable, points, sampleRate) => {
  checkDrawable(drawable);

  let clock;
  let t;

  const setup = (props) => {
    clock = xn(4);
    t = clock(0.00054);

    drawable.setup(props);
  };

  const draw = (props) => {
    // calculo t de forma pseudo aleatoria usando xn = r * x * (1 - x)
    // puedo tambien utilizar { time } para hacer el calculo progresivo
    t = clock(t);

    const [x, y] = p(points, t);

    drawable.draw({ ...props, x, y, t });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export { DataProvider };
