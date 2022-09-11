import { drawable } from "../flow";

const axis = () => {
  const setup = (props) => {
    const {
      ctx,
      dimensions: { from, to, center },
    } = props;

    console.log(from, to, center);

    ctx.stroke("#FFFFFF55");
    ctx.strokeWeight(2);

    // vertical
    ctx.line(center[0], from[1], center[0], to[1]);

    // horizontal
    ctx.line(from[0], center[1], to[0], center[1]);
  }

  return drawable(setup);
};

export { axis };
