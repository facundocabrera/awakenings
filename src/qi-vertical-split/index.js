import { centroid } from "../geometry/vector";

// Everything starts from here:
// dimensions: {
//   from: [0, 0],
//   to: [canvasWidth, canvasHeight],
//   center: [canvasWidth / 2, canvasHeight / 2]
// },

export const vertical = (from, to) => {
  const [minX, minY] = from;
  const [maxX, maxY] = to;

  const spot = [maxX, minY + (maxY - minY) / 2];
  const from2 = [minX, spot[1]];

  return [
    {
      from,
      to: spot,
      center: centroid([from, spot]),
    },
    {
      from: from2,
      to,
      center: centroid([from2, to]),
    },
  ];
};
