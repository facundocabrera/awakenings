//
// WIP - still looking for an easy way to create an integer walker.
//
//
// https://en.wikipedia.org/wiki/Binomial_distribution
//

import MersenneTwister from "mersenne-twister";
import { pow, combinations } from "mathjs";

import { BenfordWalkerN } from "./benford-walker-n";

const generator = new MersenneTwister();

/**
 * Binomial Walker.
 * 
 * @param {Number} n independent Bernoulli trials
 * @param {Number} k k successes
 * @param {Number} p successes probability
 */
function create(n, k, p) {
  // genero un walker para ir alterando los success 
  const wb = BenfordWalkerN(k);

  const 

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
