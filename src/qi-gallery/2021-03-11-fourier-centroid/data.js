import { checkDrawable } from "../../qi/interfaces";

import { sum } from "../../geometry/vector";

const { PI, cos, sin } = Math;
const DPI = 2 * PI;

const polar = (arc, r) => [r * cos(arc), r * sin(arc)];

const circlePoint = ({ freq, radius, center, time }) => {
  // ΛΘ / Λt => variacion del angulo con respecto al tiempo.
  const arc = (DPI / freq) * time;

  // con el angulo, calculo donde esta el punto
  const point = polar(arc, radius);

  // muevo el centro de al definido como parametro
  const recentered = sum(center, point);

  return recentered;
};

export const DataProvider = (drawable, circles) => {
  checkDrawable(drawable);

  const draw = (props) => {
    const points = [];
    const time = props.time;
    let center = [0, 0];

    circles.forEach((circleProps) => {
      const currentPoint = circlePoint({ ...circleProps, center, time });

      points.push(currentPoint);

      center = currentPoint;
    });

    drawable.draw({ ...props, points });
  };

  return {
    ...drawable,
    draw,
  };
};
