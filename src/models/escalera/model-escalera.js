import { sum } from "lodash";

/**
 * Este modelo describe la cantidad de pisadas que recibe un escalon de una
 * escalera de N escalones, la idea es que cada vez que llegamos a un
 * escalon por primera vez, tenemos que volver a bajar para llegar al proximo.
 *
 * El numero de pisadas que recibe cada escalor, esta descripto por la function
 * 2 * n - 1, donde n = 1 representa el ULTIMO escalón, de esta forma dejamos
 * correr la funcion para que nos armen las pisadas de atras para adelante.
 *
 * @param {Number} escalones que deseo tener
 *
 * @returns {Array} Distribucion de probabilidades desde el primer escalon al
 *                  ultimo.
 */
function distribution(escalones) {
  const d = [];
  let sum = 0;

  for (let n = 1; n <= escalones; n++) {
    const v = 2 * n - 1;
    d.push(2 * n - 1);
    sum += v;
  }

  return d.map((v) => v / sum).reverse();
}

function distance(distribution) {
  const dist = [];

  for (let i = 0; i < distribution.length - 1; i++) {
    dist.push(distribution[i] - distribution[i + 1]);
  }

  return sum(dist) / dist.length;
}

export { distribution, distance };
