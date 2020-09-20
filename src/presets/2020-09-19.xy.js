// Flow with the lions

// https://www.quantamagazine.org/when-magic-is-seen-in-twisted-graphene-thats-a-moire-20190620/
// https://www.quantamagazine.org/how-to-create-art-with-mathematics-20151008/

const steps = 936;
const freq = t => t * (2 * Math.PI / steps);
const x = t => Math.cos(freq(t));

const mapping = [
  '#DE000411',
  '#ECF20E11',
  "#63FF0711",
  '#AB27EF11', 
  '#149EEF11'
];

const angles = [
  // 0,
  // 22.5,
  // 67.5
  0,
  45,
  90
];

function metasin(t) {
  const {
    r,
    n,
    power
  } = this;

  const point = [
    r * x(t),
    r * 
      Math.pow(
        Math.sin(n * freq(t)), power
      ) / n
  ].map(i => Math.round(i));

  return point;
}

export default [2, 3, 6].map((n, k) => (
  {
    painter: "XY",
    fn: metasin,
    r: 500,
    n,
    power: 2,
    color: mapping[(k + 3) % mapping.length],
    angle: angles[k] * Math.PI / 180,
    fill: true,
  }
));