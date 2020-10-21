import MersenneTwister from "mersenne-twister";
import { log } from "mathjs";
import range from "lodash/range";

import { accum } from "./stats";

const generator = new MersenneTwister();

function create(digits) {
  const distribution = range(1, digits).map((d) => log(1 + 1 / d, digits));

  const acc = accum(distribution);

  function walker() {
    const n = generator.random();

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
