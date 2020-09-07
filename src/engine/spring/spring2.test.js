import { Spring } from "./spring2";

test('lets try our spring', () => {

  const amplitude = 10;
  const k = 16;     // spring k constant 
  const m = k / 2;  // a "mass"

  const σ = Spring(amplitude, k, m);

  const positions = [];
  const forces = [];

  let y = 1;
  let time = 0;

  // given this version is with decay, we iterate till we reach aprox 0
  // which means the spring is not moving anymore.
  while(y > 0.01) {
    y = σ.y(time);
    positions.push( y );
    forces.push( σ.force(time) );
    time += 0.1;
  }

  expect(positions).toMatchSnapshot();
  expect(forces).toMatchSnapshot();
});