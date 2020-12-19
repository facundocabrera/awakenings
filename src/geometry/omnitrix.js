import { pick } from "../utils/array";

// me quedo con X de p1, Y de p2 para armar [X,Y]
const yinYangMapper = ( p1, p2 ) => [ p1[0], p2[1] ];

function omnitrix(yin, yang, mapping = yinYangMapper) {
  const iterations = yin.length;

  const shape = [];

  for(let index = 0; index < iterations; index++) {
    shape.push( mapping( pick(yin, index), pick(yang, index) ) );
  }

  return shape;
}

export {
  omnitrix
};