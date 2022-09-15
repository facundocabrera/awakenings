import { drawable } from "../flow";

const axis = () => {
  let ui, from, to, center;

  const setup = (props) => {
    const {
      ctx,
      dimensions: { from: f, to: t, center: c },
    } = props;

    ui = ctx;
    from = f;
    to = t;
    center = c;
  };

  const draw = () => {
    ui.stroke("#FFFFFF55");
    ui.strokeWeight(2);

    // vertical
    ui.line(center[0], from[1], center[0], to[1]);

    // horizontal
    ui.line(from[0], center[1], to[0], center[1]);
  };

  return drawable(setup, draw);
};

export { axis };
