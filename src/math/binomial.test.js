// https://en.wikipedia.org/wiki/Binomial_distribution

import { cumulative, distribution } from "./binomial";
import { H } from "./entropy";

test("math/binomial/entropy", () => {
  const n = 16;
  const p = 0.5;
  const d = distribution(n, p);
  const ent = H(d);

  expect(ent).toMatchSnapshot();
});

test("math/binomial/cumulative-for-6-trials", () => {
  const n = 6;
  const p = 1 / n;

  const d = distribution(n, p);
  const accum = cumulative(d);

  expect(d).toMatchSnapshot();
  expect(accum).toMatchSnapshot();
});
