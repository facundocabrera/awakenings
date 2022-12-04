import { set, range, updateRange, neighbours } from "./pixel";

export function* walker(storage, [sw, sh, sd], [mw, mh]) {
  // prettier-ignore
  //   console.log(`
  // Walker summary:
  //   Storage: ${sh}x${sw}x${sd}.
  //   Matrix: ${mh}x${mh}x${sd}.
  // Horizontal moves: ${sw / mw}.
  // Vertical moves: ${sh / mh}.
  // `);

  for (let y = 0; y < sh; y += mh) {
    for (let x = 0; x < sw; x += mw) {
      if ((x + mw <= sw) && (y + mh <= sh)) {
        // prettier-ignore
        // console.log('Walker range: ', `(${[x, y].join(', ')})`, `=> (${[x + mw, y + mh].join(',')})`);

        // prettier-ignore
        const mutation = yield range(storage, [x, y], [x + mw, y + mh], [sw, sd]);

        if (mutation)
          updateRange(storage, [x, y], mutation, [sw, sh, sd], [mw, mh, sd]);
      }
    }
  }
}

/**
 * https://en.wikipedia.org/wiki/Kernel_(image_processing)
 *
 * Solution #2.
 * 1. Add (dx, dy) as increments instead of compute ranges to be updated matrix vs kernel.
 * 2. Updates on 1 pixels is the result of analyse neighbours and run the computation (convolution responsability).
 * 3. Iteration builds a matrix using the neighbours elements which could be used across multiple computations.
 * 4. Out of range queries should fill unknown areas with 0.
 */
export function* walker2(
  storage,
  [width, height, density = 4],
  [dx = 1, dy = 1]
) {
  if (dx < 1 || dy < 1 || Math.floor(dx) != dx || Math.floor(dy) != dy)
    throw Error("dx and dy domain is N numbers gte 1");

  for (let y = 0; y < height; y += dy) {
    for (let x = 0; x < width; x += dx) {
      const mutation = yield neighbours(
        storage,
        [width, density],
        [x, y],
        [dx, dy]
      );

      if (mutation)
        // continuar aca, aun no probe si se actualiza correctamente el pixel
        set(storage, [x, y], [width, density], mutation);
    }
  }
}
