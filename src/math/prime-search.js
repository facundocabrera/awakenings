/*
  Exploración de exponenciales.

  0x0   = 0
  1x1   = 1    1 (distancia del 0 al  1)
  2x2   = 4    3 (distancia del 1 al  4)
  3x3   = 9    5 (distancia del 4 al  9)
  4x4   = 16   7 (distancia del 9 al 16)
  5x5   = 25   9
  6x6   = 36  11
  7x7   = 49  13
  8x8   = 64  15
  9x9   = 81  17
  10x10 = 100 19 => 10 * 2 - 1
  11x11 = 121 21 => 11 * 2 - 1
  12x12 = 144 23 => 12 * 2 - 1
  13x13 = 169 25 => 13 * 2 - 1

  En resumen, el valor del cuadrado es igual al cuadrado anterior + 2 veces el 
  valor a calcular - 1.

  x^2 = (x - 1) ^ 2 + 2 * x - 1
  
  Entonces: x^2 - 2 * x + 1 = (x - 1)^2 => Demostración matematica de que es correcto el pensamiento.

  A partir de acá, es simple imaginar los siguentes calculos como polinomios.

  (x - 1)^3 = x^3 - 3 * x^2 + 3x - 1
  
  x^3 = (x - 1)^3 + 3 * x^2 - 3x + 1

  (x - 1)^4 = x^4 - 4 * x^3 + 6 * x^2 - 4x + 1

  x^4 = (x - 1)^4 + 4 * x^3 - 6 * x^2 + 4x - 1

  Entonces:
  x^2 = (x - 1)^2                                            + 2 * x - 1
  x^3 = (x - 1)^3                                 +  3 * x^2 - 3 * x + 1
  x^4 = (x - 1)^4                      +  4 * x^3 -  6 * x^2 + 4 * x - 1
  x^5 = (x - 1)^5           +  5 * x^4 - 10 * x^3 + 10 * x^2 - 5 * x + 1
  x^6 = (x - 1)^6 + 6 * x^5 - 15 * x^4 + 20 * x^3 - 15 * x^2 + 6 * x - 1

  Importante:
  - Alternancia de los signos, basicamente me voy acercando al valor, voy 
    sumando y restando en secuencia, viendo que cantidad me falta, y voy 
    agregando el termino que contribuyen a acercarme al valor esperado.

*/

function* computeDistance(limit) {
  let current = 1;
  let previous = 0;

  while (current < limit) {
    yield current + previous;

    previous = current;
    current++;
  }

}

const it = computeDistance(10);

for(let x of it) {
  console.log(x);
}