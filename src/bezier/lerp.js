/**
 * LERP
 *
 * @param {Number} p0 real value
 * @param {Number} p1 real value
 * @param {Number} t  value between [0, 1]
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
 * Bezier 2D.
 * Compute point p using bezier algorithm on 2D.
 *
 * @param {Array{n}} points points used as guide for the calculation
 * @param {Number}   t      value between [0,1]
 * @returns [x,y]
 */
const bezier2d = (points, t) => {
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

    return bezier2d(ret, t);
  }
};

export { lerp, lerp2d, bezier2d };
