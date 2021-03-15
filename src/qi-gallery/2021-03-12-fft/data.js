import { checkDrawable } from "../../qi/interfaces";

import { centroid, by } from "../../geometry/vector";

const { PI, sin, cos } = Math;
const DPI = 2 * PI;

const sinwave = (amplitude, freq, time, phase = 0) =>
  amplitude * sin(DPI * freq * time + phase);

const input = 1 / 7;
const mapped = 1 / 144;

const radius = 250;

export const DataProvider = (drawable) => {
  checkDrawable(drawable);

  const draw = (props) => {
    const { time } = props;
    const current = [time, sinwave(radius, input, time)];

    drawable.draw({ ...props, current });
  };

  return {
    ...drawable,
    draw,
  };
};

export const CircularMapping = (drawable) => {
  checkDrawable(drawable);

  let ui;

  const setup = (props) => {
    ui = props.ctx;

    drawable.setup(props);
  };

  const draw = (props) => {
    const { current: point } = props;

    const [time, wave] = point;

    // mapeo el tiempo en un circulo con cierta calidad, y uso la
    // amplitud como magnitud en el mapeo, y solved.
    const x = cos(DPI * mapped * time) * wave;
    const y = sin(DPI * mapped * time) * wave;

    drawable.draw({ ...props, current: [x, y] });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};

export const ComputeCentroid = (drawable) => {
  checkDrawable(drawable);

  const buffer = [];

  const draw = (props) => {
    buffer.push(props.current);

    const oid = by(centroid(buffer), 250);

    drawable.draw({ ...props, oid });
  };

  return {
    ...drawable,
    draw,
  };
};
