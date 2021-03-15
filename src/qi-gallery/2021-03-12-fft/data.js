import { checkDrawable } from "../../qi/interfaces";

const { PI, sin, cos } = Math;
const DPI = 2 * PI;

const sinwave = (amplitude, freq, time, phase = 0) =>
  amplitude * sin(DPI * freq * time + phase);

const input = 1 / 700;
const mapped = 1 / 100;

export const DataProvider = (drawable) => {
  checkDrawable(drawable);

  const draw = (props) => {
    const { time } = props;
    const current = [time, sinwave(100, input, time)];

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
