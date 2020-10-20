// @TODO finish

// https://en.wikipedia.org/wiki/Binomial_distribution

import MersenneTwister from "mersenne-twister";
import { pow, combinations } from "mathjs";
import range from "lodash/range";

import { accum } from './stats';

const generator = new MersenneTwister();

/**
 * @param {Number} n independent Bernoulli trials
 * @param {Number} k k successes
 * @param {Number} p successes probability
 */
function create(n, k, p) {
  const f = (n, k) => combinations(n, k) * pow(p, k) * pow(1 - p, n - k);

  function walker() {
    const value = f(n, k);

    for (let i = 0; i < acc.length; i++) {
      if (n < acc[i]) {
        return i + 1;
      }
    }

    return n;
  }

  return walker;
}

export { create as benfordWalkerN };
