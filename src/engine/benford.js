// https://en.wikipedia.org/wiki/Benford's_law

import range from "lodash/range";

import { plot as plop } from "../console/plot";
import { distribution as gdist } from "../math/benford";

const digits = base => ((base - 1) + '').length;
const extract = (n, base) => Number((n + "").substr(0, digits(base)));
const buckets = base => new Array(base - 1);

const Benford = ({
  errorMargin = 0.01, // 1% of error
  base = 10
} = {}) => {
  // Expected Distribution
  const ideal = gdist(base);

  // Trials
  const stats = buckets(base).fill(0);
  let counter = 0;

  const add = (n) => {
    if (Number.isFinite(n)) {
      const digit = extract(n, base);

      // TODO:
      // Verificar si esto es necesario despues de haber agregado el extract.
      if (digit < 1) {
        throw `first digit must be ${range(1, base)} given ${n}`;
      }

      // EXPLAINED:
      // El manejo para extraer los digitos es demasiado rustico, entonces
      // soy propenso a querer contar numeros que no entran en la base.
      // Si tengo base 16 y le paso un 16, el extract devuelve un 16, y rompe
      // el arreglo de stats.
      if (digit > base - 1) {
        throw `double check input because we are overflowing the base => ${digit} > ${base - 1}`;
      }

      stats[digit - 1]++;
      counter++;
    } else {
      throw `Infinity value provided / Overflow`;
    }
  };

  const distribution = () => {
    return stats.map(s => s / counter);
  };

  const diff = () => {
    let index = 0;

    const current = distribution();
    const limit = current.length;

    const diff = buckets(base);

    while (index < limit) {
      diff[index] = ideal[index] - current[index];
      index++;
    }

    return diff;
  };

  const obeyTheLaw = () => {
    let obey = true;
    let index = 0;

    const current = distribution();
    const limit = current.length;

    while (obey && index < limit) {
      const currentError = Math.abs(ideal[index] - current[index]);
      obey = currentError < errorMargin;
      index++;
    }

    return obey;
  };

  const plot = title => plop(title, ideal, distribution());

  return {
    add,
    distribution,
    obeyTheLaw,
    ideal,
    diff,
    plot,
  };
};

export { Benford };
