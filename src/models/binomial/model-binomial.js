import { sum } from "lodash";

const { combinations } = require("mathjs");

const { PI } = Math;

const build = (n) => {
  const comb = [];

  for (let i = 0; i <= n; i++) comb.push(Math.round(combinations(n, i)));

  return comb;
};

const prob = (counters) => {
  const total = sum(counters);

  return counters.map((counter) => counter / total);
};

const lengths = (counters) =>
  counters.map((counters) => String(counters).length);

const angles = (prob) => prob.map((p) => p * 2 * PI);

export { build, prob, lengths, angles };
