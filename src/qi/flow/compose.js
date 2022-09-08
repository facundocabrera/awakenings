export const compose = (drawables) => {
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
