import { checkDrawable } from "../qi/interfaces";

import { split } from ".";

import { centroid } from "../geometry/vector";

export const SplitLayout = (drawable, currentSlot) => {
  checkDrawable(drawable);

  // validate slot number - only 0,1 (left, right)
  switch (currentSlot) {
    case 0:
    case 1:
      break;
    default:
      throw "Invalid slot";
  }

  let ui;
  let center;

  const calculateCenterOfCurrentSlot = (from, to) => {
    let [topLeftCorner, , bottomRightCorner] = split(from, to)[currentSlot];

    return centroid([topLeftCorner, bottomRightCorner]);
  };

  const setup = (props) => {
    const {
      ctx,
      dimensions: { from, to },
      ...other
    } = props;

    // expose globally
    ui = ctx;

    // redefine dimensions
    const [_from, , _to] = split(from, to)[currentSlot];

    // lo estoy agregando a la API, no estaba
    center = centroid([_from, _to]);

    drawable.setup({
      ctx,
      dimensions: {
        from: _from,
        to: _to,
        center,
      },
      ...other,
    });
  };

  // TODO: ver que onda
  // quizas podria borrar esto y que lo haga el hijo, ya que le estoy pasando el
  // center en el setup.
  const draw = (props) => {
    ui.push();

    ui.translate(...center);
    drawable.draw(props);

    ui.pop();
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};
