// https://en.wikipedia.org/wiki/Benford's_law

import { accum } from "./stats";

test("accum 2", () => {
  const distribution = [0.5, 0.5];

  expect(accum(distribution)).toEqual([0.5, 1]);
});

test("accum 3", () => {
  const distribution = [0.3, 0.4, 0.3];

  expect(accum(distribution)).toEqual([0.3, 0.7, 1]);
});
