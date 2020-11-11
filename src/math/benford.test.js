// https://en.wikipedia.org/wiki/Benford's_law

import { cumulative as accum } from "./stats";
import { cumulative, distribution } from "./benford";

//
// Para mi sorpresa, calcular la distribucion de probabilidades, y la acumulada,
// se puede hacer usando el mismo logaritmo cambiando de los parametros.
// Hasta donde pude probar, es exactamente lo mismo que hacer la suma
// incremental simplificandome el codigo.
//
test("math/benford/log", () => {
  const base = 10;

  const cum = cumulative(base);
  const classic = accum(distribution(base));

  expect(cum).toEqual(classic);
});
