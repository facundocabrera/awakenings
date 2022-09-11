import React from "react";

import Color from "../../qi/inputs/Color";

import { getParameter } from "../../qi/inputs/selectors";
import { update } from "../../qi/inputs/state";

export const getColorFrom = getParameter("colorFrom", "#FF3600");
export const getColorTo = getParameter("colorTo", "#FFED00");

const Controls = () => {
  return (
    <>
      <h2>Lerp</h2>
      <Color
        name="colorFrom"
        label="Color From"
        selector={getColorFrom}
        {...{ update }}
      />
      <Color
        name="colorTo"
        label="Color To"
        selector={getColorTo}
        {...{ update }}
      />
    </>
  );
};

export default Controls;
