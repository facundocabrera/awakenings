import { GenericWalker } from "./walker";
import { distribution } from "../models/escalera/model-escalera";
import { cumulative } from "../math/stats";

const EscaleraWalker = base => {
  const cd = cumulative(distribution(base));

  return GenericWalker(cd);
};

export {
  EscaleraWalker
}