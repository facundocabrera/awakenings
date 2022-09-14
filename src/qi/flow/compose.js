import { isDrawable } from "../interfaces";

export const compose = (drawables) => {
  const invalid = drawables.filter(d => !isDrawable(d));

  if (invalid.length > 0) {
    throw Error("provided invalid drawables", invalid);
  }

  return drawables.reduce((prev, curr) => {
    return {
      setup(...args) {
        return curr.setup(prev.setup(...args));
      },
      draw(...args) {
        return curr.draw(prev.draw(...args));
      },
    };
  });
};
