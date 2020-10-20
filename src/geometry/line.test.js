const { abs, sqrt, pow, atan } = Math;

import { line_points, line_equation_builder } from "./line";

test("line_points", () => {
  const p2 = [1, 0];
  const p1 = [0, 1];
  const step = sqrt(2);

  const result = [
    p1,
    p2
  ]

  const current = line_points(...p1, ...p2, step);

  expect(
    current
  ).toEqual(
    result
  );
});

test("line_points", () => {
  const p1 = [-1, 0];
  const p2 = [0, -1];
  const step = sqrt(2);

  const result = [
    p1,
    p2
  ]

  const current = line_points(...p1, ...p2, step);

  expect(
    current
  ).toEqual(
    result
  );
});

test("line_points", () => {
  const p1 = [-2, 0];
  const p2 = [ 0, 2];
  const step = sqrt(2);

  const result = [
    p1,
    [-1, 1],
    p2
  ]

  const current = line_points(...p1, ...p2, step);

  expect(
    current
  ).toEqual(
    result
  );
});

test("line_points", () => {
  const p1 = [0, 3];
  const p2 = [3, 0];
  const step = sqrt(2);

  const result = [
    p1,
    [1, 2],
    [2, 1],
    p2
  ]

  const current = line_points(...p1, ...p2, step);

  console.log(...current);
  console.log(...result);

  expect(
    current
  ).toEqual(
    result
  );
});

test("line_equation_builder", () => {
  // [x, y] format
  const p1 = [0, 1];
  const p2 = [1, 0];
  const p3 = [-1, 2];

  const line_fn = line_equation_builder(...p1, ...p2);

  // line_fn(x) = y
  expect(line_fn(p1[0])).toBe(p1[1]);
  expect(line_fn(p2[0])).toBe(p2[1]);
  expect(line_fn(p3[0])).toBe(p3[1]);
});