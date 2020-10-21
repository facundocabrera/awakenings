import { stops } from "./circle";
import { line_points, line_equation_builder } from "./line";

test("line_points: (0, -5) => (5, 0)", () => {
  const p1 = [0, -5];
  const p2 = [5, 0];

  const result = [
    p1,
    [1, -4],
    [2, -3],
    [3, -2],
    [4, -1],
    p2
  ];

  const current = line_points(...p1, ...p2);

  // console.log('expected', result);
  // console.log('current', current);

  expect(current).toEqual(result);
});

test("line_points: (-4, 0) => (0, -4)", () => {
  const p1 = [-4, 0];
  const p2 = [0, -4];

  const result = [
    p1,
    [-3, -1],
    [-2, -2],
    [-1, -3],
    p2
  ];

  const current = line_points(...p1, ...p2);

  // console.log('expected', result);
  // console.log('current', current);

  expect(current).toEqual(result);
});

test("line_points: (-3, 0) => (0, 3)", () => {
  const p1 = [-3, 0];
  const p2 = [0, 3];

  const result = [
    p1,
    [-2, 1],
    [-1, 2],
    p2
  ];

  const current = line_points(...p1, ...p2);

  // console.log('expected', result);
  // console.log('current', current);

  expect(current).toEqual(result);
});

test("line_points: (0, 2) => (2, 0)", () => {
  const p1 = [0, 2];
  const p2 = [2, 0];

  const result = [
    p1,
    [1, 1],
    p2
  ];

  const current = line_points(...p1, ...p2);

  // console.log('expected', result);
  // console.log('current', current);

  expect(current).toEqual(result);
});

test("line_points: (0.5, 0.866) => (-0.5, 0.866)", () => {
  const p1 = [0.5, 0.866];
  const p2 = [-0.5, 0.866]; 

  const current = line_points(...p1, ...p2);
  const result = [
    p1,
    p2
  ];

  // console.log(current);
  // console.log(result);

  expect(
    current
  ).toEqual(
    result
  );
});

test("line_points: (0.5 * 2, 0.866 * 2) => (-0.5 * 2, 0.866 * 2)", () => {
  const p1 = [0.5 * 2, 0.866 * 2];
  const p2 = [-0.5 * 2, 0.866 * 2];

  const current = line_points(...p1, ...p2);
  const result = [
    p1,
    [0, 0.866 * 2],
    p2
  ];

  // console.log(current);
  // console.log(result);

  expect(
    current
  ).toEqual(
    result
  );
});

test("line_points + stops(6)", () => {
  const [ p1, p2 ] = stops(6);

  const current = line_points(...p1, ...p2);
  const result = [
    p1,
    p2
  ];

  console.log(current);
  console.log(result);

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