// do not forget to keep the balance.

import range from "lodash/range";

function exp(time) {
  const { y, A } = this;

  return [y, A * Math.exp((-1 * time) / 33)];
}

function spring(time) {
  const { A, k, m = 1 } = this;

  // const y = (A * Math.cos( Math.sqrt( k / m ) * time ));
  const y = A * Math.cos((Math.PI / 7) * time * 10);

  return exp.apply({ ...this, y }, [5 * Math.sin(time)]);
}

export default range(-500, 500, 50).map((A) => ({
  painter: "XY",
  fn: spring,
  A,
  k: 11,
  m: 2,
  // color: '#DE000411',
  // color: '#ECF20E11',
  // color: "#63FF0711",
  // color: '#AB27EF11',
  color: "#149EEF11",
}));
