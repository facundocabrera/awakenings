// https://en.wikipedia.org/wiki/Benford's_law

import { accum } from "./stats";

test("accum 2", () => {
  const distribution = [.5,.5];

  expect(accum(distribution)).toEqual([.5, 1]);
});

test("accum 3", () => {
  const distribution = [.3,.4,.3];

  expect(accum(distribution)).toEqual([.3, .7, 1]);
});
