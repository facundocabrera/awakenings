import { drawable } from "../flow";

export const origin = () => {
  const setup = (props) => {
    return {
      dimensions: {
        ...props.dimensions,
        center: [0, 0],
      },
    };
  };

  return drawable(setup);
};
