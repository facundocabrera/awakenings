import { pow, combinations } from "mathjs";
import range from "lodash/range";
import { cumulative } from "./stats";

/**
 * Binomial Mass Function.
 * 
 * @param {Number} n independent Bernoulli trials
 * @param {Number} k k successes
 * @param {Number} p successes probability
 * 
 * @returns Number between [0, 1]
 */
const mass = (n, k, p) => combinations(n, k) * pow(p, k) * pow(1 - p, n - k);

const distribution = (n, p) => range(1, n).map(s => mass(n, s, p));

export {
  mass,
  distribution,
  cumulative,
};