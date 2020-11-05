import range from "lodash/range";

const {
  log10 
} = Math;

const log = (a, b) => log10(a) / log10(b);

const cumulative = base => [
  ...range(2, base).map(v => log(v, base)),
  1
];

const distribution = base => range(1, base).map(v => log(1 + 1 / v, base));

export {
  cumulative,
  distribution
};