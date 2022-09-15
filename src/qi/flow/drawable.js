const emptyFn = () => {};

export const drawable = (s = emptyFn, d = emptyFn) => ({
  setup: (props) => ({ ...props, ...(s(props) ?? {}) }),
  draw: (props) => ({ ...props, ...(d(props) ?? {}) }),
});
