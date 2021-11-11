/**
 * LERP
 * 
 * @param {number} p0 real value (modulo of a vector)
 * @param {number} p1 real value (modulo of a vector)
 * @param {number} t  value between [0, 1]
 * 
 * @returns number
 */
const lerp = (p0, p1, t) => p0 * (1-t) + p1 * t;

/**
 * LERP 2D
 * 
 * @param {array{2}} param0 [x1, y1]
 * @param {array{2}} param1 [x2, y2]
 * @param {number}   t 
 * 
 * @returns [x3, y3]
 */
const lerp2d = ([x1, y1], [x2, y2], t) => [
  /* x3 */ lerp(x1, x2, t), /* y3 */ lerp(y1, y2, t)
];

const p = (points, t) => {
  if (points.length === 1) {
    return points[0];
  } else {
    const ret = [];
    
    for(let i = 0; i < points.length - 1; i++) {
      ret.push( lerp2d(points[i], points[i+1], t) );
    }
    
    return p(ret, t);
  }
};

export {
  lerp, lerp2d, p
};
