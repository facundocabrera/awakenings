import { once } from "lodash";
import { drawable } from "../flow/drawable";

const clearCanvas = (bg = "#004166", runOnce = false) => {
  let context;

  const setup = (props) => {
    const { ctx } = props;
    context = ctx;
  };

  const draw = () => {
    context.clear();
    context.background(bg);
  };

  const drawOnce = once(draw);

  return drawable(setup, runOnce ? drawOnce : draw);
};

export { clearCanvas };
