import { pick } from "../utils/array";
import { middle_vector } from "./vector";

function omnitrix(yin, yang, mapping = omniMapperXY) {
  const iterations = Math.max(yin.length, yang.length);

  const shape = [];

  for (let index = 0; index < iterations; index++) {
    shape.push(mapping(pick(yin, index), pick(yang, index)));
  }

  return shape;
}

const omniBuilder = (shapes, mapping) =>
  shapes.reduce((yin, yang) => {
    if (!yin) return yang;
    else return omnitrix(yin, yang, mapping);
  }, false);

const omniMapperXY = (p1, p2) => [p1[0], p2[1]];

const omniMiddleVector = (p1, p2) => middle_vector(...p1, ...p2);

export { omnitrix, omniBuilder, omniMapperXY, omniMiddleVector };
