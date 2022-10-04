import { default as vScale } from "../vector/scale-values";

const scale = (matrix, factor) => {
  const height = matrix.length;

  for (let y = 0; y < height; y++) {
    vScale(matrix[y], factor);
  }

  return matrix;
};

export default scale;
