// https://en.wikipedia.org/wiki/Benford's_law

import { Benford } from "../engine/benford";
import { walker } from "./benford-walker";

test("random-walk/benford", () => {
  const b = Benford();

  let counter = 0;
  
  // Un dato interesante, el numero de trials que genero, necesita ser un numero
  // mayor a 2500, esta conclusion la saco luego de probar varias veces. Puede
  // que con un numero menor de iteraciones pase, pero no siempre sucede.
  while (counter < 3000) {
    b.add(walker());
    counter++;
  }

  b.plot('random-walk/benford');

  expect(b.obeyTheLaw()).toBe(true);
});
