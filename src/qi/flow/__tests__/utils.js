import { drawable } from "../drawable";

export const createTestableDrawables = (sx, dx) => {
  const setup = jest.fn(sx);
  const draw = jest.fn(dx);

  const d = drawable(setup, draw);

  return [setup, draw, d];
};
