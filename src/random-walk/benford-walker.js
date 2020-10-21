const { random } = Math;

import { accum } from "./stats";

const benford = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => Math.log10(1 + 1 / d));

const acc = accum(benford);

function walker() {
  const n = random();

  for (let i = 0; i < acc.length; i++) {
    if (n < acc[i]) {
      return i + 1;
    }
  }

  return 9;
}

export { walker };
