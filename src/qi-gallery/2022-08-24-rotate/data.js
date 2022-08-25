import { checkDrawable } from "../../qi/interfaces";
import { mult_vector } from "../../geometry/vector";

const DataProvider = (drawable) => {
  checkDrawable(drawable);

  const line = mult_vector(
    [
      [0, 0],
      [1, 0],
    ],
    100
  );

  const square = mult_vector(
    [
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
    ],
    100
  );

  const setup = (props) => {
    drawable.setup(props);
  };

  const draw = (props) => {
    drawable.draw({
      ...props,
      square,
      line,
    });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export { DataProvider };
