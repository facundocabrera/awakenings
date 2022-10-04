import { default as vSum } from "../vector/sum-values";

const sum = (matrix) => {
  const height = matrix.length;
  let sum = 0;

  for (let y = 0; y < height; y++) {
    sum += vSum(matrix[y]);
  }

  return sum;
};

export default sum;
