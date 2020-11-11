import MersenneTwister from "mersenne-twister";
import { distribution, cumulative } from "../math/binomial";

const generator = new MersenneTwister();

/**
 * Binomial Walker.
 *
 * @param {Number} n independent Bernoulli trials
 * @param {Number} p successes probability
 */
function Binomial(n, p) {
  const d = distribution(n, p);
  const acc = cumulative(d);
  const len = acc.length;

  function walker() {
    const rand = generator.random();

    for (let i = 0; i < len; i++) {
      if (rand < acc[i]) {
        return i;
      }
    }

    return len;
  }

  return walker;
}

export { Binomial };
