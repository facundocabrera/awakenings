import { chunk } from "lodash";
import { range, updateRange } from "./pixel";

/**
 * 1. At this level of computation density should be equal to 1.
 * 2. Adding `.shape` as numpy allow me to easily access to the description of
 *    the structure while the underlaying storage is linear.
 * 3. Need to keep thinking about GPU and memory mapping.
 * 4. In python, there is an overloaded implementation of `*` allowing to
 *    multiply arrays, that opens the door to optimized implementation and allow
 *    multiple dimensions just hidden behind the overload.
 */
export const applyMatrix = (data, matrix) => {
  const w = data[0].length;
  const h = data.length;
  const tmp = Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // This captures my attention:
      // Line equation used to map a Quadratic equation without losing
      // information. The only tradeoff, we need to define a fixed width.
      // But, we can extend the model adding 1 fixed argument per dimension.
      tmp[y * w + x] = data[y][x] * matrix[y][x];
    }
  }

  return chunk(tmp, w);
};

/**
 * 1. There is no overlapping while applying the operation given the step is
 *    handle by the matrix width and height.
 * 2. Create high level iterator dividing the storage in smaller matrices.
 * 2.1. Example: iterate storage using 4x4xdensity, and allow mutation.
 * 3. The pattern repeats given I can imagine the smaller matrix is just the same
 * parent structure.
 */
export function convolution(storage, matrix, [sw, sh, sd], [mw, mh, md]) {
  if (sd != md) throw Error("Different density provided. Not supported yet.");

  for (let i = 0; i < sw; i += mw) {
    for (let j = 0; j < sh; j += mh) {
      const data = range(storage, [i, j], [i + mw, j + mh], [sw, sd]);

      const state = applyMatrix(data, matrix);

      updateRange(storage, [i, j], state, [sw, sh, sd], [mw, mh, md]);
    }
  }
}
