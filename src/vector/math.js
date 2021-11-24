import { zip } from "lodash";

/**
 * https://en.wikipedia.org/wiki/Dot_product
 * Algebraic definition
 */
const dot = (vector1, vector2) => {
  if (vector1.length === vector2.length) {
    return zip(vector1, vector2)
      .map(([v1, v2]) => v1 * v2)
      .reduce((sum, n) => sum + n, 0);
  }

  throw Error("dot / lengths must be equal");
};

const scale2D = (space2d, weights) => {
  if (space2d.length === weights.length) {
    return zip(space2d, weights).map(([[x, y], w]) => [x * w, y * w]);
  }

  throw Error("scale2D / lengths should be equals");
};

const scale3D = (space3d, weights) =>
  zip(space3d, weights).map(([[x, y, z], w]) => [x * w, y * w, z * w]);

const scaleND = (spaceNd, weights) =>
  zip(spaceNd, weights).map(([vector, w]) => vector.map((v) => v * w));

export { dot, scale2D, scale3D, scaleND };
