// https://en.wikipedia.org/wiki/Binomial_distribution

import { cumulative, distribution } from "./binomial";
import { H } from "./entropy";

// 
// Para mi sorpresa, calcular la distribucion de probabilidades, y la acumulada,
// se puede hacer usando el mismo logaritmo cambiando de los parametros.
// Hasta donde pude probar, es exactamente lo mismo que hacer la suma 
// incremental simplificandome el codigo.
// 
test("math/binomial", () => {
  const n = 11;
  const p = 0.5;
  
  const d = distribution(n, p);
  const accum = cumulative(d);
  const { length: l } = accum;

  // la distribucion accumulada me da aproximadamente el 50% en la mitad
  expect(
    Math.abs(
        accum[(l % 2 === 0) ? l / 2 - 1 : (l - 1) / 2 + 1 ] - 0.5
      ) < 0.01
    ).toBe(true);
});

test("math/binomial/entropy", () => {
  const n = 16;
  const p = 0.5;
  const d = distribution(n, p);
  const ent = H(d);

  expect(ent.toFixed(2)).toEqual("0.92");
});