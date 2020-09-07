// source https://www.math.arizona.edu/~jwatkins/h-ode.pdf

/**
 * Spring.
 * 
 * @param {Number} A Amplitude
 * @param {Number} k Spring constant
 * @param {Number} m Mass 
 */
function Spring(A, k, m) {
  const w = Math.sqrt( k / m );

  function y(t) {
    return A * Math.exp(-1 * t) * Math.cos(t);
  }

  function force(t) {
    return -1 * k * y(t);
  }

  return {
    y,
    force
  }
}

export {
  Spring
}
