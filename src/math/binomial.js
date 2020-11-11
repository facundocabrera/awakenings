// https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library/binomial-random-variables/v/probability-of-making-2-shots-in-6-attempts

import { pow, combinations } from "mathjs";
import range from "lodash/range";
import { cumulative } from "./stats";

/**
 * Binomial Mass.
 *
 * @param {Number} n independent trials
 * @param {Number} k number of times for a specific outcome within n trials
 * @param {Number} p successes probability for a single trial
 *
 * @returns Number between [0, 1]
 */
const mass = (n, k, p) => combinations(n, k) * pow(p, k) * pow(1 - p, n - k);

/**
 * Binomial distribution.
 *
 * Comienzo desde 0 exitos, hasta evaluar n exitos en los n intentos.
 *
 * @param {Number} n independent trials
 * @param {Number} p successes probability for a single trial
 */
const distribution = (n, p) => range(0, n).map((s) => mass(n, s, p));

export { mass, distribution, cumulative };
