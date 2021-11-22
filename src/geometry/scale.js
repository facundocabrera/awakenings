/**
 * Multiple by vector.
 *
 * @param {[ [x, y], ... ]} elements arreglo de puntos
 * @param {[ z, t ]} by factor
 *
 * @returns {[ [x * z, y * t], ... ]}
 */
export const multi = (elements, [z, t]) =>
  elements.map(([x, y]) => [x * z, y * t]);

/**
 * Multiple by scalar.
 *
 * @param {[ [x, y], ... ]} elements arreglo de puntos
 * @param {Number} by scalar
 *
 * @returns {[ [x * by, y * by], ... ]}
 */
export const multiByScalar = (elements, by) => multi(elements, [by, by]);

export const scale = (vector, by) => vector.map((x) => x * by);
