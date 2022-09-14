import { drawable } from "../flow/drawable";

const memory = (name, selector) => {
  let mem = [];

  const draw = (props) => {
    const { hasEnded = false } = props;

    if (hasEnded) {
      mem = [];
    } else {
      mem.push(selector(props));
    }

    return {
      [name]: mem,
    };
  };

  return drawable(undefined, draw);
};

export { memory };
