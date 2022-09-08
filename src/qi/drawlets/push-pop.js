import { drawable } from "../flow/drawable";

const pushPop = (child) => {
  let context;

  const setup = (props) => {
    const { ctx } = props;
    context = ctx;

    return child.setup(props);
  };

  const draw = (props) => {
    context.push();
    const aux = child.draw(props);
    context.pop();
    return aux;
  };

  return drawable(setup, draw);
};

export { pushPop };
