// https://en.wikipedia.org/wiki/Log-logistic_distribution

import { logLogistic } from "./log-logistic";
import { segments } from "./sampling";

test("math/log-logistic", () => {
  const cumulative = logLogistic(1, 8, 0.01, 2, 1 / 100);

  expect(cumulative[cumulative.length - 1] > 0.01).toBe(true);
});

test("math/log-logistic/segments", () => {
  const cumulative = logLogistic(1, 8, 0.01, 2, 0.00618);
  const d = segments(cumulative, 10);

  console.log(d);
});
