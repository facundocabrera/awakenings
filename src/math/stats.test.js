// https://en.wikipedia.org/wiki/Benford's_law

import { cumulative } from "./stats";

test("math/stats/cumulative/coin", () => {
  const distribution = [0.5, 0.5];

  expect(cumulative(distribution)).toEqual([0.5, 1]);
});

test("math/stats/cumulative/3-states", () => {
  const distribution = [0.3, 0.4, 0.3];

  expect(cumulative(distribution)).toEqual([0.3, 0.7, 1]);
});
