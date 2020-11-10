import { H, I } from './entropy';
import { distribution } from "./benford";

test("math/entropy/self-information/dits", () => {
  // Un evento que sabemos va a pasar, no tiene información.  
  expect(I(1, 10)).toEqual(-0);

  // Un evento que tenemos un 90% de certeza que va a pasar, ya empieza a tener
  // información.
  expect(I(0.9, 10)).toBeGreaterThanOrEqual(0.04);

  // Tirar una moneda y que salga cara, tiene aun mas información
  expect(I(0.5, 10)).toBeGreaterThanOrEqual(0.3);

  // Un evento con 30% de probabilidad
  expect(I(0.3, 10)).toBeGreaterThanOrEqual(0.3);

  // Un evento con 10% de probabilidad
  expect(I(0.1, 10)).toBe(1);
  
  // Eventos con aun menos probabilidad
  expect(I(0.01, 10)).toBe(2);
  expect(I(0.001, 10)).toBe(3);
  expect(I(0.0001, 10)).toBe(4);

  // Un evento imposible tiene información infinita
  expect(I(0, 10)).toBe(Infinity);
});

test("math/entropy/self-information/bits", () => {
  const base = 2;
  
  expect(I(1, 2)).toEqual(-0);
  expect(I(1/2, 2)).toEqual(1);
  expect(I(1/4, 2)).toEqual(2);
  expect(I(1/8, 2)).toEqual(3);

  // 
  // Si presto atención, se ve que el numero de bits necesarios para codificar
  // una probabilidad, coincide con el numero de bits para representar la base
  // 
  // 1/2 => 1 bit
  // 1/4 => 2 bits
  // 1/8 => 3 bits
  // 
  // Ejemplo 1: [1/4, 2/4, 3/4, 4/4] => [00 01 10 11]
  // Ejemplo 2: [1/8, 2/8, 3/8, 4/8, 5/8, 6/8, 7/8, 8/8] => [000 001 010 100 ... 111]
  //
  // Todo esto esta intimamente relacionado con las combinaciones, pero aun no 
  // lo veo con claridad. 🧠⚡️❤️ 
  //
});

test("math/entropy/benford", () => {
  const base = 10;
  
  const probabilities = distribution(base);
  const h = H(probabilities, base);

  expect(Number(h.toFixed(2))).toEqual(0.87);
});

test("math/entropy/coin", () => {
  const base = 2;
  
  const probabilities = [1/2, 1/2];
  const h = H(probabilities, base);

  expect(h).toEqual(1);
});

