const merge = ([width, height, density = matrixes.length], ...matrixes) => {
  const h = Array(height);
  const realWidth = width * density;

  for (let y = 0; y < height; y++) {
    const w = Array(realWidth);

    for (let x = 0; x < realWidth; x += density) {
      for (let d = 0; d < density; d++) {
        w[x + d] = matrixes[d][y][x];
      }
    }

    h[y] = w;
  }

  return h;
};

export default merge;
