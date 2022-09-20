export const position = ([x, y], [width, density]) =>
  y * width * density + x * density;

export const read = (storage, [x, y], [width, density]) => {
  const pos = position([x, y], [width, density]);

  // more work to be done here, maybe I can create an vector which validates using just width and height known values.
  if (pos > storage.length - 1) return [];

  return storage.slice(pos, pos + density);
};

export const set = (storage, [x, y], [width, density], values) => {
  const start = position([x, y], [width, density]);

  storage.set(values, start);

  return storage;
};

export const scale = (value, density) => {
  switch (density) {
    case 2:
      return [...value, ...value];
    case 3:
      return [...value, ...value, ...value];
    case 4:
      return [...value, ...value, ...value, ...value];
    default: {
      const args = Array(density);
      for (let i = 0; i < density; i++) {
        args[i] = value;
      }
      return [].concat(...args);
    }
  }
};
