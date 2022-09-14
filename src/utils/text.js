export const toText = vector => `( ${vector.reduce((prev, curr) => `${prev}, ${curr}`)} )`;
