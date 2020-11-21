// https://en.wikipedia.org/wiki/Log-logistic_distribution

const { pow } = Math;

import { sample } from "./sampling";

const logLogistic = (α, β, xStart, xEnd, dx) => {
  if (!(α > 0 && β > 0 && xStart > 0)) throw "α > 0 and β > 0 and xStart > 0";

  const cdf = (x) => 1 / (1 + pow(x / α, -1 * β));

  return sample(cdf, xStart, xEnd, dx);
};

export { logLogistic };
