// love is everything, flow the lions

import range from 'lodash/range';

const sqrtTwoPi = Math.sqrt(2 * Math.PI);

function bell(t) {
  const {
    r,
    μ,
    σ
  } = this;

  const point = [
    r * Math.cos(t),
    r * 
      Math.pow(
        Math.log(
          t
        ), t) * Math.sin(t)
  ];

  console.log(point);

  return point;
}

const mapping = [
  '#DE000433',
  '#ECF20E33',
  "#63FF0733",
  '#AB27EF33', 
  '#149EEF33'
];

export default range(-450, 450, 50)
  .map((r, k) => ({
    painter: "XY",
    fn: bell,
    r,
    μ: 2 / k,
    σ: 3,
    color: '#ECF20E11'
  }));
