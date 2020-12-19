// me quedo con X de p1, Y de p2 para armar [X,Y]
const yinYangMapper = ( p1, p2 ) => [ p1[0], p2[1] ];

function omnitrix(yin, yang, mapping = yinYangMapper) {
  if (yin.length != yang.length)
    throw 'Necesito la misma cantidad de stops por el momento';

  const iterations = yin.length;

  const shape = [];

  for(let index = 0; index < iterations; index++) {
    shape.push( mapping( yin[index], yang[index] ) );
  }

  return shape;
}

export {
  omnitrix
};