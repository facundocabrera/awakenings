/**
 * Calculo para generar una grilla de 4 cuadrados simetricos, teniendo en
 * cuenta que el canvas cubre desde [0, 0] a [width, height].
 *
 * @param {Array} param0
 * @param {Array} param1
 */
export const grid = (
  [x, y] /* (left, top) corner */,
  [n, m] /* (right, bottom) corner */
) => {
  const center = [(x + n) / 2, (y + m) / 2];

  return [
    // top, left
    [[x, y], [(x + n) / 2, y], [...center], [x, (y + m) / 2]],
    // top, right
    [[(x + n) / 2, y], [n, y], [n, (y + m) / 2], [...center]],
    // bottom, right
    [[...center], [n, (y + m) / 2], [n, m], [(x + n) / 2, m]],
    // bottom, left
    [[x, (y + m) / 2], [...center], [(x + n) / 2, m], [x, m]],
  ];
};
