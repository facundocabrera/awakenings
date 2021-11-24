export const min_max = (vector_size) => {
  const min = Array(vector_size).fill(Infinity);
  const max = Array(vector_size).fill(-Infinity);

  return (vector) => {
    if (vector.length === vector_size) {
      vector.forEach((value, i) => {
        min[i] = Math.min(min[i], value);
        max[i] = Math.max(max[i], value);
      });

      return { min, max };
    }

    throw Error("MinMax / different lengths provided");
  };
};
