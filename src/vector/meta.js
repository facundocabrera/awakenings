/**
 * META OF ARRAY
 */
const vector_of = (value, size) => {
  const vector = Array(size);
  let val = value;

  if (typeof value !== "function") val = () => value;

  for (let i = 0; i < size; i++) {
    vector[i] = val();
  }

  return vector;
};

export { vector_of };
