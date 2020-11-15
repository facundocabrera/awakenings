const { PI } = Math;

import { fibonacci, sequenceOf, ratios } from "./fibonacci";

test("math/fibonacci", () => {
  const expected = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597];
  const sequence = [];
  const gen = fibonacci(17);

  for(let v of gen) {
    sequence.push(v);
  }

  expect(sequence).toEqual(expected);
});

test("math/fibonacci/sequenceOf", () => {
  const expected = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597];
  expect(sequenceOf(17)).toEqual(expected);
});

test("math/fibonacci/ratios", () => {
  const r = ratios(144, 9);
  const precalculated = [
    0.6180339887498949,
    0.3819660112501052,
    0.23606797749978972,
    0.1458980337503155,
    0.09016994374947426,
    0.055728090000841224,
    0.03444185374863303,
    0.02128623625220819,
    0.01315561749642484
  ]

  expect(r).toEqual(precalculated);
});

test("math/fibonacci/distances", () => {
  const base = 9;
  const fr = ratios(144, base);

  // Ejemplo de uso de las distancia como proporsiones, lo pense como la
  // distancia que roto desde el 0 y que voy a repertir como parte de un modelo
  // de capas.
  console.log(fr.map(v => 360 * v ));
  console.log(fr.map(v => PI * v ));
  console.log(fr.map(v => 1 - v ));
})
