import { line_points } from "./line";

function fragment(base, magnifier) {
  let vertex = [];

  for (let i = 0; i < base.length - 1; i++) {
    let points = line_points(
      ...base[i].map((v) => v * magnifier),
      ...base[i + 1].map((v) => v * magnifier)
    );

    if (i > 0) {
      points = points.slice(1);
    }

    vertex = [...vertex, ...points];
  }

  // 👁👁👁 Conectamos el ultimo punto con el primero
  vertex = [
    ...vertex,
    ...line_points(
      ...base[base.length - 1].map((v) => v * magnifier),
      ...base[0].map((v) => v * magnifier)
    ).slice(1, -1)
  ];

  return vertex;
}

export {
  fragment
};