// 1. If you provide a float with to many decimals, how we solve that?
// 2. Decimals introduce errors into the computation, can I measure that error?
const domain = (valueAsFloatBetween0and1, [min, max]) => {
  return Math.round((max - min) * valueAsFloatBetween0and1);
  // console.log( toUint8(0, [0, 255]) );
  // console.log( toUint8(0.1, [0, 255]) );
  // console.log( toUint8(0.25, [0, 255]) );
  // console.log( toUint8(0.5, [0, 255]) );
  // console.log( toUint8(0.75, [0, 255]) );
  // console.log( toUint8(1, [0, 255]) );
};

export default domain;
