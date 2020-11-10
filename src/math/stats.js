import sum from "lodash/sum";

function cumulative(distribution) {
  const accum = [];
  
  for (let i = 1; i < distribution.length; i++) {
    accum.push(sum(distribution.slice(0, i)));
  }

  return [...accum, 1];
}

export { cumulative };
