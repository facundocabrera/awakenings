export const mapping = {
  ' ': 0,
  a: 1, // vocal
  b: 2,
  c: 3,
  d: 4,
  e: 5, // vocal
  f: 6,
  g: 7,
  h: 8,
  i: 9, // vocal
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  ñ: 15,
  o: 16, // vocal
  p: 17,
  q: 18,
  r: 19,
  s: 20,
  t: 21,
  u: 22, // vocal
  v: 23,
  w: 24,
  x: 25,
  y: 26,
  z: 27
};

const sum = (accumulator, char) => accumulator + mapping[char];

export const toNumber = word => word.split('').reduce(sum, 0);
