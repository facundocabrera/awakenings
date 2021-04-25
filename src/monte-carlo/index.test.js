import { MonteCarlo } from './index';

test('should generate 50%, 50% with an error less than 1%', () => {

  const outputs = {
    1: 0,
    2: 0
  };
  const walker = MonteCarlo([0.5, 1], [1,2]);

  for (let index = 0; index < 100000; index++) {
    outputs[walker()]++;
  } 

  const error = Math.abs(outputs[1] - outputs[2]) / (outputs[1] + outputs[2]);
  
  // Por lo menos espero tener un error menor al 0.01
  expect(error < 0.01).toBe(true);
});