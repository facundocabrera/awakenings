import { Spring } from "./spring";

test('lets try our spring', () => {

  const amplitude = 10;
  const k = 1; // spring k constant 
  const m = 2; // a "mass"

  const σ = Spring(amplitude, k, m);

  const positions = [];
  const forces = [];

  // a full cycle of our spring
  for(let time = 0; time * Math.sqrt(k/m) < 2 * Math.PI; time += 1) {
    positions.push( σ.y(time) );
    forces.push( σ.force(time) );
  }

  // this is because k is 1 hehehe
  const expected = forces.map(v => -1 * v);

  // pay attention to the values, the shows you the cycle staring from 10 and finishing around that value.
  // console.log(positions);

  expect(positions).toEqual(expected);
});