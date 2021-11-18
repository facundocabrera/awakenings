/**
 * The Beauty of Bézier Curves
 * https://www.youtube.com/watch?v=aVwxzDHniEw
 */
import { checkDrawable } from "../../qi/interfaces";
import { p } from "../../bezier/lerp";
import { screenToAxis } from "../../geometry/axis";
import { grouping } from "../../collection/chunk";

const xn = (r) => (x) => r * x * (1 - x);

const DataProvider = (drawable, points, groupSize) => {
  checkDrawable(drawable);

  let clock;
  let t;
  let origin;

  const setup = (props) => {
    const {
      dimensions: { center },
    } = props;
    origin = center;

    clock = xn(4);
    t = clock(1 / 40);

    drawable.setup(props);
  };

  const draw = (props) => {
    if (points.length === 0) return;

    // el hecho de que el tiempo sea aleatorio, me permite evaluar los paths
    // a medida que voy agregando puntos dinamicamente.
    // si uso el tiempo progresivo p(t = 0.001) sucede una unica vez, en cambio
    // de forma aleatoria, puedo volver a un punto cercano, sin importar t.
    t = clock(t);

    // calculo los grupos de puntos para dibujar los distintos pis a medida
    // avanza el tiempo
    const pis = grouping(points, groupSize, true, true).reduce((acc, curr) => {
      acc.push(p(screenToAxis(curr, origin), t));
      return acc;
    }, []);

    drawable.draw({ ...props, t, pis });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export { DataProvider };
