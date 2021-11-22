import { checkDrawable } from "../../qi/interfaces";
import { random_vector } from "../../math/vector";
import { stops } from "../../geometry/circle";
import { centroid } from "../../geometry/vector";

const DataProvider = (drawable, weights) => {
  checkDrawable(drawable);

  // puntos alrededor de un circulo (vectores unitarios).
  const pointsVector = stops(weights);

  // vector aleatorio de weights para simular comportamiento.
  const weightsVector = random_vector(weights);

  // compute min and max coordinate to draw a box
  let min = [0, 0];
  let max = [0, 0];

  const engine = (input, r1 = 100, r2 = 200) => {
    const lines = [];
    const ends = [];

    for (let i = 0; i < weights; i++) {
      const wi = weightsVector[i]; // current weight
      const [x, y] = pointsVector[i]; // current point on the circle

      const activation = input(); // equal to neuron activation value [0, 1]

      const start = [x * r1, y * r1];
      const stop = [
        x * r1 + x * (r1 + r2) * wi * activation,
        y * r1 + y * (r1 + r2) * wi * activation,
      ];

      ends.push(stop);
      lines.push([start, stop]);
    }

    const gravity = centroid(ends);

    min = [Math.min(min[0], gravity[0]), Math.min(min[1], gravity[1])];
    max = [Math.max(max[0], gravity[0]), Math.max(max[1], gravity[1])];

    return {
      gravity,
      lines,
      min,
      max,
    };
  };

  const draw = (props) => {
    const { activation } = props;
    const { gravity, lines } = engine(activation);

    drawable.draw({
      ...props,
      lines,
      gravity,
      min,
      max,
      weightsVector,
      t: activation(),
    });
  };

  return {
    ...drawable,
    draw,
  };
};

export { DataProvider };
