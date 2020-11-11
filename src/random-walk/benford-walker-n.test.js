// https://en.wikipedia.org/wiki/Benford's_law

import { Benford } from "../engine/benford";
import { BenfordWalkerN } from "./benford-walker-n";

test("random-walk/benford-walker-n", () => {
  const base = 6;
  const walker = BenfordWalkerN(base);
  const b = Benford({
    base,
  });

  let counter = 0;

  while (counter < 3000) {
    b.add(walker());
    counter++;
  }

  b.plot("random-walk/benford-walker-n");

  expect(b.obeyTheLaw()).toBe(true);
});
