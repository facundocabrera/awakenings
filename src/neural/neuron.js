import { zip } from "lodash";

import { stops } from "../geometry/circle";
import { centroid } from "../geometry/vector";
import { random_vector } from "../math/vector";

export const apply = (points, weights) =>
  zip(points, weights).map(([[x, y], w]) => [x * w, y * w]);

export const Neuron = ({ connections }) => {
  // puntos alrededor de un circulo (vectores unitarios).
  const vector = stops(connections);

  // vector aleatorio de weights para simular comportamiento.
  const weights = random_vector(connections);

  // vectores weights
  const wv = apply(vector, weights);

  // activar neurona con vector de entrada
  const activate = (input) => centroid(apply(wv, input));

  return {
    activate,
  };
};

export const TrackNeuronActivationDomain = (neuron) => {
  const { activate } = neuron;
  let min = [Infinity, Infinity];
  let max = [-Infinity, -Infinity];

  const tracker = (...args) => {
    const output = activate(...args);

    console.log(output);

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
