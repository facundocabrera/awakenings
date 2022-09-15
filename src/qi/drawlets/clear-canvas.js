import { drawable } from "../flow/drawable";

const clearCanvas = (bg = "#004166") => {
  let context;

  const setup = (props) => {
    const { ctx } = props;
    context = ctx;
  };

  const draw = () => {
    context.clear();
    context.background(bg);
  };

  return drawable(setup, draw);
};

export { clearCanvas };
