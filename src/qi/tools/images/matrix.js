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

export const read = (matrix, [x, y, density]) => {
  matrix[y].slice(x, x + density);
};

/**
 * Apply kernel to a neighborhood and return an array of density values.
 * 
 * @source http://www.songho.ca/dsp/convolution/convolution.html#convolution_2d
 * 
 * @param {*} neighborhood 3x3xdensity
 * @param {*} kernel 3x3xdensity
 * @param {*} shape [width, height, density]
 * 
 * @returns Array(density)
 */
export const convolutè = (neighborhood, kernel, [width, height, density]) => {
  const sum = Array(density).fill(0);

  const realWidth = width * density;

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < realWidth; x += density) {
      for(let d = 0; d < density; d++) {
        sum[d] += neighborhood[y][x + d] * kernel[(height - 1) - y][(realWidth - 1) - x - d];
      }
    }
  }

  return sum;
}
