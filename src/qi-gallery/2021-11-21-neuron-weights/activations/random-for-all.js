import { checkDrawable } from "../../../qi/interfaces";

export const RandomForAllProvider = (drawable) => {
  checkDrawable(drawable);

  const draw = (props) => {
    drawable.draw({
      ...props,
      activation: () => Math.random(), // tiene demasiada precision (eυe)
    });
  };

  return {
    ...drawable,
    draw,
  };
};
