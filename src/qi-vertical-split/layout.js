import { checkDrawable } from "../qi/interfaces";

import { vertical } from ".";

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

  const setup = (props) => {
    const {
      dimensions: { from, to },
    } = props;

    drawable.setup({
      ...props,
      // redefine dimensions
      dimensions: vertical(from, to)[currentSlot],
    });
  };

  return {
    ...drawable,
    setup,
  };
};
