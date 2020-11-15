import { centroid } from "./vector";

test("geometry/vector/centroid", () => {
  const points = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ];

  expect(centroid(points)).toEqual([0.5, 0.5]);
});

test("geometry/vector/centroid", () => {
  const points = [
    [0, 0],
    [2, 0],
    [2, 2],
    [0, 2],
  ];

  expect(centroid(points)).toEqual([1, 1]);
});
