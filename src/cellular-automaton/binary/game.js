//
// Reglas:
//   - Los Humanos tenemos 50% de posibilidades de ser Hombres o Mujeres.
//   - Uso el XOR como funcion de cambio en cada iteración.
//   - Comienzo en la dualidad 0 y 1.
//

import { MonteCarlo } from "../../monte-carlo";

// no deterministico
const expansion = (walker, currentState) => {
  const len = currentState.length;
  const nextState = new Array(len + 2).fill(-1);

  for (let i = 0; i < len; i++) {
    // no todos los nodos son necesarios de ser calculados aleatoriamente
    if (nextState[i] === -1) {
      nextState[i] = walker(); // 0 o 1 con 50% de probabilidad
    }

    nextState[i + 2] = currentState[i] === 1 ? nextState[i] ^ 1 : nextState[i];
  }

  return nextState;
};

// deterministico
const contraction = (currentState) => {
  const len = currentState.length - 2;
  const nextState = new Array(len).fill(-1);

  // la reduccion se hace a xor como lo aprendimos
  for (let i = 0; i < len; i++) {
    nextState[i] = currentState[i] ^ currentState[i + 2];
  }

  return nextState;
};

const automata = (max = 54, direction = 1) => {
  const probabilities = [0.5, 1];
  let initialState = [0, 1];
  let lastState = null;
  const walker = MonteCarlo(probabilities, initialState);

  // wave behavior simulation
  let cursor = 1;
  const up = () => direction === 1;
  const down = () => direction === -1;

  return () => {
    if (lastState === null) {
      lastState = initialState;
    } else {
      if (!((up() && cursor <= max) || (down() && cursor > 2))) {
        direction = up() ? -1 : 1;
      }

      lastState = up() ? expansion(walker, lastState) : contraction(lastState);
    }

    cursor += direction;

    return lastState;
  };
};

export { automata };
