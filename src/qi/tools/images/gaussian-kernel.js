/**
 * @source https://fiveko.com/gaussian-filter-in-pure-javascript/
 */
export const kernel = (σ, dim) => {
  const sqrtSigmaPi2 = Math.sqrt(Math.PI * 2.0) * σ;
  const s2 = 2.0 * σ ** 2;
  const kernel = new Float32Array(dim - !(dim & 1)); // Make it odd number
  const half = parseInt(kernel.length / 2);
  let sum = 0.0;

  for (let j = 0, i = -half; j < kernel.length; i++, j++) {
    kernel[j] = Math.exp(-(i ** 2) / s2) / sqrtSigmaPi2;
    sum += kernel[j];
  }

  // Normalize the gaussian kernel to prevent image darkening/brightening
  for (let i = 0; i < dim; i++) {
    kernel[i] /= sum;
  }

  return kernel;
};

/**
 * 1. I could call the function using 2 different sigma values, for now I
 *    prefer simplicity.
 * 2. It always return a odd number of elements to represent the maximun
 *    value of the distribution (left and right values are mirrored).
 */
export const kernel2D = (σ, width, height) => {
  const x = kernel(σ, width);

  if (x.length != width)
    throw Error(
      "You are trying to create a matrix but kernel and dimensions values does not match."
    );

  const matrix = new Array(height);
  for (let h = 0; h < height; h++) {
    const row = new Array(width);

    for (let w = 0; w < width; w++) {
      row[w] = x[w] * x[h];
    }

    matrix[h] = row;
  }

  return matrix;
};

// @TODO candidate to be called replicate and use density as the replication value
export const densify = (matrix, [width, height, density]) => {
  const result = new Array(height);

  for (let h = 0; h < height; h++) {
    const row = new Array(width * density);

    for (let w = 0; w < width; w++) {
      for (let d = 0; d < density; d++) {
        row[w * density + d] = matrix[h][w];
      }
    }

    result[h] = row;
  }

  return result;
};
