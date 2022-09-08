export const chain = (drawables) => {
  return drawables.reduce((prev, curr) => {
    return {
      setup(...args) {
        prev.setup(...args);
        curr.setup(...args);
      },
      draw(...args) {
        prev.draw(...args);
        curr.draw(...args);
      },
    };
  });
};
