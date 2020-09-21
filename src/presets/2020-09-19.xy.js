// Flow with the lions

// https://www.quantamagazine.org/when-magic-is-seen-in-twisted-graphene-thats-a-moire-20190620/
// https://www.quantamagazine.org/how-to-create-art-with-mathematics-20151008/

const steps = 360;
const freq = t => t * (2 * Math.PI / steps);
const x = t => Math.cos(freq(t));

const mapping = [
  '#DE000455',
  '#ECF20E55',
  "#63FF0755",
  '#AB27EF55', 
  '#149EEF55'
];

const saturnColorMapping = [
  '#D6C6A811',
  '#CE998811',
  '#9F6C7011',
  '#5D4C5811',
  '#2F2C3711'
];

const angles = [
  0,
  22.5,
  67.5
  // 0,
  // 45,
  // 90,
  // 90,
  // 180,
  // 270,
].map(d => d * 2 * Math.PI / 360);

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

const preset = [2, -2].map((n, k) => (
  {
    painter: "XY",
    fn: metasin,
    r: 500,
    n,
    power: 2,
    color: saturnColorMapping[k % saturnColorMapping.length],
    angle: angles[k % angles.length],
    fill: true,
    rad: 13
  }
));

// General Engine Control Settings
preset.frameRate = 60;
preset.background = 0;
preset.fullScreen = false;

export default preset;
