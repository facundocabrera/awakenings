import { range } from "lodash";
import MersenneTwister from "mersenne-twister";

const generator = new MersenneTwister();

export const random_vector = (size) => {
  const vector = Array(size);

  for (let i = 0; i < size; i++) {
    vector[i] = generator.random();
  }

  return vector;
};

export const fixed_vector = (size, value) => {
  const vector = Array(size);

  for (let i = 0; i < size; i++) {
    vector[i] = value;
  }

  return vector;
};

export const seq_vector = (size, step = 1, shift = 0) =>
  range(shift, size * step + shift, step);
