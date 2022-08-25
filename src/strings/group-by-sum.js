import { toNumber } from "./word-to-number";

export const groupBySum = (words) =>
  words.reduce((group, word) => {
    const n = toNumber(word);

    try {
      group[n] = [...group[n], word];
    } catch (e) {
      group[n] = [word];
    }

    return group;
  }, {});

export const toGroupLength = (group) => {
  const g = {};

  for (const [key, value] of Object.entries(group)) {
    g[key] = value.length;
  }

  return g;
};
