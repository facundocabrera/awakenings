import { default as mScale } from "./scale-values";
import { default as mSum } from "./sum-values";

const normalize = (matrix) => mScale(matrix, 1 / mSum(matrix));

export default normalize;
