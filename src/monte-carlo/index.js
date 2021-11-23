import MersenneTwister from "mersenne-twister";

import { vector_of } from "../vector/meta";

//
// Le doy la distribución de probabilidad acumulada que quiero usar para los
// outputs que deseo generar.
//
// const probabilities = [ 0.5, 1 ]; // sistema binario
// const outputs = [ 1 , 2 ];
//
// const walker = Monte(probabilities, outputs);
// console.log(walker)
//
function MonteCarlo(probabilities, outputs) {
  const generator = new MersenneTwister();

  return () => {
    // Genero un número aleatorio que va entre [0, 1]
    const rand = generator.random();

    // Arranco comparando
    let index = 0;
    while (rand > probabilities[index]) {
      index++;
    }

    if (index > probabilities.length)
      throw Error("MonteCarlo fails to find an output");

    return outputs[index];
  };
}

function MonteCarloVector(probabilities, outputs, size) {
  const engine = MonteCarlo(probabilities, outputs);

  return () => vector_of(engine, size);
}

function AsyncMonteCarloVector(probabilities, outputs, size) {
  const engine = MonteCarlo(probabilities, outputs);

  const asyncEngine = async () => {
    return await engine();
  };

  return async () => {
    return await Promise.all([...Array(size).keys()].map(asyncEngine));
  };
}

export { MonteCarlo, AsyncMonteCarloVector, MonteCarloVector };
