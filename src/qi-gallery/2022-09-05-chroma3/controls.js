import React from "react";

import Range from "../../qi/inputs/Range";
import Color from "../../qi/inputs/Color";

import { getParameter } from "../../qi/inputs/selectors";
import { update } from "../../qi/inputs/state";

export const getP1 = getParameter("p1", 1);
export const getP2 = getParameter("p2", 1);

export const getColorFrom = getParameter("colorFrom", "#FF3600");
export const getColorTo = getParameter("colorTo", "#FFED00");

const Controls = () => {
  return (
    <>
      <h2>Chroma 3</h2>
      <Range label="Radius" name="p1" selector={getP1} update={update} />
      <Range label="Freq" name="p2" selector={getP2} update={update} />
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
