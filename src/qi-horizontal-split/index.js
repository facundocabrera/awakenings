import { centroid } from "../geometry/vector";

export const split = (
  [x, y] /* (left, top) corner */,
  [n, m] /* (right, bottom) corner */
) => {
  const center = centroid([
    [x, y],
    [n, m],
  ]);

  return [
    // left side (slot 0)
    [
      [x, y],
      [center[0], y],
      [center[0], m],
      [x, m],
    ],
    // right side (slot 1)
    [
      [center[0], y],
      [n, y],
      [n, m],
      [center[0], m],
    ],
  ];
};
