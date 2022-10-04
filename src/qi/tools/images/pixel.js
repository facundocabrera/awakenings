import between from "../numbers/between"; 

export const position = ([x, y], [width, density]) =>
  y * width * density + x * density;

export const read = (storage, [x, y], [width, density]) => {
  const pos = position([x, y], [width, density]);

  if (pos < 0 || pos >= storage.length) return [];

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

// 1. Review the idea of views to prevent creating a matrix structure.
// 2. TypedArray CANT store a memory position, so it's not usable for building a matrix.
export const range = (storage, [x, y], [z, t], [sw, sd]) => {
  const matrix = new Array(t - y);

  for (let h = 0; h < t - y; h++) {
    // compute position
    const start = position([x, y + h], [sw, sd]);

    // horizontal chunks (copy of the original)
    const row = storage.slice(start, start + (z - x) * sd);

    // accumulate chunks vertically
    matrix[h] = row;
  }

  return matrix;
};

export const updateRange = (
  storage,
  [x, y],
  state,
  [storageW, storageH, storageDensity],
  [stateW, stateH, stateDensity]
) => {
  for (let row = 0; row < stateH; row++) {
    set(storage, [x, y + row], [storageW, storageDensity], state[row]);
  }
};

export const neighbours = (storage, [width, density = 4], [x, y], [dx, dy]) => {
  const result = Array(2 * dy + 1);
  const limits = (y) => {
    const start = y * width * density;
    const end = start + width * density;

    return [start, end];
  };

  for (let h = y - dy, columnIndex = 0; h <= y + dy; h++, columnIndex++) {
    const row = Array(2 * dx + 1);

    for (let w = x - dx, rowIndex = 0; w <= x + dx; w++, rowIndex += density) {
      const pos = position([w, h], [width, density]);
      let value;

      if (pos < 0 || pos >= storage.length || !between(pos, limits(h)) ) {
        value = Array(density).fill(0);
      } else {
        value = read(storage, [w, h], [width, density]);
      }

      if (density === 1) {
        row[rowIndex] = value[0];
      } else
        for (let index = 0; index < density; index++) {
          row[rowIndex + index] = value[index];
        }
    }

    result[columnIndex] = row;
  }

  return result;
};
