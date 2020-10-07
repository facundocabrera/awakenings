// https://en.wikipedia.org/wiki/Benford's_law

import { walker } from './benford-walker';

test('Benford walker', () => {  
  let counter = 0;

  while(counter < 100) {
    console.log(walker());
    counter++;
  }

  expect(true).toBe(false);
});
