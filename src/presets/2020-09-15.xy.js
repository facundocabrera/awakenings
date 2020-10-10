// love is everything, flow the lions

import range from "lodash/range";

const sqrtTwoPi = Math.sqrt(2 * Math.PI);

function bell(t) {
  const { σ, μ, r } = this;

  // t = t % (89 / 100);

  const point = [
    2 * r * Math.atan(t),
    r *
      (1 / (σ * sqrtTwoPi)) *
      Math.exp(((-1 * Math.pow(t - μ, 2)) / 2) * Math.pow(σ, 2)) *
      Math.sin(t),
  ];

  console.log(point);

  return point;
}

const mapping = [
  "#DE000411",
  "#ECF20E11",
  "#63FF0711",
  "#AB27EF11",
  "#149EEF11",
];

export default range(-500, 500, 89).map((r, k) => ({
  painter: "XY",
  fn: bell,
  σ: 1 / 16,
  μ: 1 / 16,
  r,
  color: mapping[k % mapping.length],
}));
