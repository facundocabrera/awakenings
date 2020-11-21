import MersenneTwister from "mersenne-twister";

function GenericWalker(cumulative) {
  const generator = new MersenneTwister();

  function walker() {
    const n = generator.random();
    const len = cumulative.length;

    for (let i = 0; i < len; i++) {
      if (n < cumulative[i]) {
        return i;
      }
    }

    return len - 1;
  }

  return walker;
}

export { GenericWalker };
