import { stops } from "../geometry/circle";
import { centroid } from "../geometry/vector";
import { random_vector } from "../math/vector";

import { scale2D } from "../vector/math";

export const apply = scale2D;

export const Neuron = ({ connections }) => {
  // puntos alrededor de un circulo (vectores unitarios).
  const space2d = stops(connections);

  // vector aleatorio de weights para simular comportamiento.
  const weights = random_vector(connections);

  // vectores weights
  const wv = apply(space2d, weights);

  // activar neurona con vector de entrada
  const activate = (input) => centroid(apply(wv, input));

  return {
    activate,
    internals: {
      connections,
      wv,
    },
  };
};

export const TrackNeuronActivationDomain = (neuron) => {
  const { activate } = neuron;
  let min = [Infinity, Infinity];
  let max = [-Infinity, -Infinity];

  const tracker = (input) => {
    // Este codigo asume que el resultado es un vector, y es un space2D.
    const output = activate(input);

    min = [Math.min(min[0], output[0]), Math.min(min[1], output[1])];
    max = [Math.max(max[0], output[0]), Math.max(max[1], output[1])];
  };

  const box = () => [min, max];

  return {
    ...neuron,
    box,
    activate: tracker,
  };
};
