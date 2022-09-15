import { curry } from "lodash";
import { cos, sin } from "mathjs";

import { drawable } from "../../qi/flow";

const DataProvider = (f, r, x0) => {
  //
  // Primero tomamos valores iniciales de R y X.
  // - R puede ser cualquier numero real.
  // - X solo puede ser un valor dentro del intervalo [0,1].
  //
  // Evaluamos las condiciones iniciales:
  // R = 3.14
  // X = 0.21
  //
  // Xn+1 = 3.14 * 0.21 * (1 - 0.21)
  //
  // En la proxima corrida, usamos Xn+1 como valor de X
  //
  // Xn+1 = 3.14 * Xn+1 * (1 - Xn+1)
  //
  // Este valor converge en el tiempo, asi que tengo que evaluar la ecuación
  // muchas veces.
  //

  // // x se mueve desde 0 a 1, que seria de una población "minima" a una máxima.
  // const f = r => x => r * x * (1 - x);
  // // const f = r => x => r * (x - x * x);
  // const f = r => x => r * sin(Math.PI * x);

  let current;
  let last;

  const setup = () => {
    current = f(r);
    last = current(x0);
  };

  const draw = () => {
    const x = last;
    const y = current(last);

    last = y;

    return { x, y };
  };

  return drawable(setup, draw);
};

const curried = curry(DataProvider);

// https://en.wikipedia.org/wiki/Logistic_map
export const RecurrentXn = curried((r) => (x) => r * x * (1 - x));

export const RecurrentSin = curried((r) => (x) => r * sin(x) * sin(1 - x));

export const RecurrentCos = curried((r) => (x) => r * cos(x) * cos(1 - x));
