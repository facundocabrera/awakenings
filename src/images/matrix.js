import domain from "../numbers/domain";

/**
 * Loop over rows to allow computations between matrix.
 *
 * @param {matrix}          m1
 * @param {matrix}          m2
 * @param {Array(w, h, d)}  shape
 * @param {Function}        opcode
 */
export const applyOpByRow = (m1, m2, [w, h, d], opcode) => {
  for (let row = 0; row < h; row++) {
    opcode(m1[row], m2[row], [w, d]);
  }

  return m1;
};

/**
 * Keep values between 0 to 255.
 */
export const opMultRGBA = (left, right, [length, density]) => {
  // prettier-ignore
  for (let index = 0; index < length * density; index+= density) {
    left[index]     = domain(right[index],     [0, left[index]]);     // R
    left[index + 1] = domain(right[index + 1], [0, left[index + 1]]); // G
    left[index + 2] = domain(right[index + 2], [0, left[index + 2]]); // B
    left[index + 3] = domain(right[index + 3], [0, 255]);             // A
  }
};
