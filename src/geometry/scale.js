/**
 * Multiple by vector
 * @param {[ [x, y], ... ]} elements
 * @param {[ [x * z, y * t], ... ]} by
 */
const multi = (elements, [z, t]) => elements.map(([x, y]) => [x * z, y * t]);

/**
 * Multiple by scalar.
 * @param {[ [x, y], ... ]} elements
 * @param {[ [x * by, y * by], ... ]} by
 */
const multiByScalar = (elements, by) => multi(elements, [by, by]);

export { multi, multiByScalar };
