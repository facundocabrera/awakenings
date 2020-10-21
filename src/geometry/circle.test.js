const { abs, sqrt, pow, atan } = Math;

import { stops } from "./circle";

test("stops", () => {
  const current = stops(6);
  const result = [
    [1, 0],
    [0.5, 0.866],
    [-0.5, 0.866],
    [-1, 0],
    [-0.5, -0.866],
    [0.5, -0.866],
  ];

  expect(current).toEqual(result);
});
