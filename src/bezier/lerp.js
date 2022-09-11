/**
 * LERP
 *
 * @param {number} p0 real value
 * @param {number} p1 real value
 * @param {number} t  value between [0, 1]
 *
 * @returns Number
 */
const lerp = (p0, p1, t) => p0 * (1 - t) + p1 * t;

/**
 * LERP 2D
 *
 * @param {Array{2}} p0 [x1, y1]
 * @param {Array{2}} p1 [x2, y2]
 * @param {Number}   t  value between [0,1]
 *
 * @returns [x3, y3]
 */
const lerp2d = ([x1, y1], [x2, y2], t) => [
  /* x3 */ lerp(x1, x2, t),
  /* y3 */ lerp(y1, y2, t),
];

/**
 * Compute point p using bezier algorithm.
 *
 * @param {Array{n}} points points used as guide for the calculation
 * @param {Number}   t      value between [0,1]
 * @returns [x,y]
 */
const p = (points, t) => {
  if (points.length === 0) {
    throw Error("No points provided");
  }

  if (points.length === 1) {
    return points[0];
  } else {
    const ret = [];

    for (let i = 0; i < points.length - 1; i++) {
      ret.push(lerp2d(points[i], points[i + 1], t));
    }

    return p(ret, t);
  }
};

/**
 * Bezier 2D
 *
 * @param {Array<Array<Number,Number>>} points2d points used as guide for the calculation
 * @param {Number} time value between [0,1]
 * @returns [x,y]
 */
const bezier2d = (points2d, time) => points2d.reduce((prev, curr) => lerp2d(prev, curr, time));

export { lerp, lerp2d, p, bezier2d };
