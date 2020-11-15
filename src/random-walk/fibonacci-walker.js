import MersenneTwister from "mersenne-twister";
import { cumulative } from "../math/fibonacci";

function FibonacciWalker(base) {
  const acc = cumulative(base);
  const generator = new MersenneTwister();

  function walker() {
    const n = generator.random();
    const len = acc.length;

    for (let i = 0; i < len; i++) {
      if (n < acc[i]) {
        return i;
      }
    }

    return len - 1;
  }

  return walker;
}

export { FibonacciWalker };
