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
    } = props;

    ui = ctx;
    center = calculateCenterOfCurrentSlot(from, to);

    drawable.setup(props);
  };

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
