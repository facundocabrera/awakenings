import { cumulative } from "../math/benford";

const { random } = Math;

const acc = cumulative(10);

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
