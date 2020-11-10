import range from "lodash/range";
import log from "./log";

const cumulative = base => [
  ...range(2, base).map(v => log(v, base)),
  1
];

const distribution = base => range(1, base).map(v => log(1 + 1 / v, base));

export {
  cumulative,
  distribution
};