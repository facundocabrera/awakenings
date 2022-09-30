import { range, updateRange } from "./pixel";

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
