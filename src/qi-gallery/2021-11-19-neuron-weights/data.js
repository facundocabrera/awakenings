import { checkDrawable } from "../../qi/interfaces";
import { random_vector } from "../../math/vector";
import { stops } from "../../geometry/circle";
import { centroid } from "../../geometry/vector";

const xn = (r) => (x) => r * x * (1 - x);

const DataProvider = (drawable, weights) => {
  checkDrawable(drawable);

  let clock;
  let t;
  let origin;

  // puntos alrededor de un circulo (vectores unitarios).
  const pointsVector = stops(weights);

  // vector aleatorio de weights para simular comportamiento.
  const weightsVector = random_vector(weights);

  const createLines = (input, r1 = 100, r2 = 300) => {
    const lines = [];
    const ends = [];

    for (let i = 0; i < weights; i++) {
      const wi = weightsVector[i]; // current weight
      const [x, y] = pointsVector[i]; // current point on the circle

      const start = [x * r1, y * r1];
      const stop = [
        x * r1 + x * (r1 + r2) * wi * input,
        y * r1 + y * (r1 + r2) * wi * input,
      ];

      ends.push(stop);
      lines.push([start, stop]);
    }

    const gravity = centroid(ends);

    return {
      gravity,
      lines,
    };
  };

  const setup = (props) => {
    const {
      dimensions: { center },
    } = props;
    origin = center;

    clock = xn(4);
    t = clock(0.001);

    drawable.setup(props);
  };

  const draw = (props) => {
    // el hecho de que el tiempo sea aleatorio, me permite evaluar los paths
    // a medida que voy agregando puntos dinamicamente.
    // si uso el tiempo progresivo p(t = 0.001) sucede una unica vez, en cambio
    // de forma aleatoria, puedo volver a un punto cercano, sin importar t.
    t = clock(t);

    // multiplico el vector de numeros aleatorios por un valor aleatorio.
    const { gravity, lines } = createLines(t);

    drawable.draw({ ...props, lines, gravity, weightsVector, t });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export { DataProvider };
