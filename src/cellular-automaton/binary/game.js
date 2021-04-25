// 
// Reglas:
//   - Los Humanos tenemos 50% de posibilidades de ser Hombres o Mujeres.
//   - Uso el XOR como funcion de cambio en cada iteración.
//   - Comienzo en la dualidad 0 y 1.
// 

import { MonteCarlo } from '../../monte-carlo';

const automata = () => {
  const probabilities = [0.5, 1];
  let initial = [0, 1];
  let lastNode = null;
  const walker = MonteCarlo(probabilities, initial);

  return () => {
    if (lastNode === null) {
      lastNode = initial;
      return initial;
    }

    const node = new Array(lastNode.length + 2).fill(-1);

    for (let i = 0; i < lastNode.length; i++) {
      // no todos los nodos son necesarios de ser calculados aleatoriamente
      if (node[i] === -1) {
        node[i] = walker(); // 0 o 1 con 50% de probabilidad
      }

      node[i + 2] = lastNode[i] === 1 ? (node[i] ^ 1): node[i];
    }

    lastNode = node;

    return node;
  };
};

export { automata };