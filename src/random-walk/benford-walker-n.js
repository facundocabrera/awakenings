import MersenneTwister from "mersenne-twister";
import { cumulative } from "../math/benford";

function BenfordWalkerN(base) {
  const acc = cumulative(base);
  const generator = new MersenneTwister();

  function walker() {
    const n = generator.random();

    for (let i = 0; i < acc.length; i++) {
      if (n < acc[i]) {
        return i + 1;
      }
    }

    return base - 1;
  }

  return walker;
}

export { 
  BenfordWalkerN 
};
