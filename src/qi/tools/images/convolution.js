import { chunk } from "lodash";

import { range, updateRange } from "./pixel";
import { walker, walker2 } from "./walker";
import { applyOpByRow, opMultRGBA } from "./matrix";
import domain from "../numbers/domain";

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
 * Solution #1.
 *
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

/**
 * Solution #2 fixed to 1 specific operation.
 *
 * @param {*} storage
 * @param {*} shape
 * @param {*} kernel
 * @param {*} shape
 */
export const rgbaConvolution = (storage, [sw, sh, sd], kernel, [kw, kh]) => {
  const walk = walker(storage, [sw, sh, sd], [kw, kh]);

  let { value, done } = walk.next();
  while (!done) {
    // mutation are applied to value
    applyOpByRow(value, kernel, [kw, kh, sd], opMultRGBA);

    // the footprint is the mutation applied to value, so we feed it to be applied
    // to the same matrix return by the iterator
    ({ value, done } = walk.next(value));
  }
};

/**
 * Solution #3. Mutator should be provided as parameter.
 *
 * @param {Array} storage
 * @param {Array} shape
 * @param {Array} kernel
 * @param {Array} shape
 * @param {Function} mutator
 */
export const convolution3 = (
  storage,
  [sw, sh, sd],
  kernel,
  [kw, kh],
  mutator
) => {
  const walk = walker(storage, [sw, sh, sd], [kw, kh]);

  let { value, done } = walk.next();
  while (!done) {
    // should let me know the value has been changed.
    const mutated = mutator(value, kernel, [kw, kh, sd]);

    // if mutated then send value to apply the updates.
    ({ value, done } = walk.next(mutated ? value : undefined));
  }
};

export const rgba_mutator = (value, kernel, [width, height]) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      value[y][x + 0] = domain(
        kernel[y][x + 0] * (value[y][x + 0] / 255),
        [0, 255]
      );
      // value[y][x + 1] = domain(kernel[y][x + 1] * (value[y][x + 1] / 255), [0, 255]);
      // value[y][x + 2] = domain(kernel[y][x + 2] * (value[y][x + 2] / 255), [0, 255]);
      // value[y][x + 3] = domain(kernel[y][x + 3] * (value[y][x + 3] / 255), [0, 255]);
    }
  }

  return true;
};

/**
 * Solution #4. Use a real convolution algorithm.
 *
 * @param {Array} storage
 * @param {Array} shape
 * @param {Array} kernel
 * @param {Array} shape
 * @param {Function} mutator
 */
export const convolution4 = (storage, [sw, sh, sd], [dx, dy], mutator) => {
  const walk = walker2(storage, [sw, sh, sd], [dx, dy]);

  let { value, done } = walk.next();
  while (!done) {
    const vv = mutator(value);

    // if mutated then send value to apply the updates.
    ({ value, done } = walk.next(vv));
  }
};
