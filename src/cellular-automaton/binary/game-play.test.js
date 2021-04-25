import { automata } from './game';

describe('Sample of Binary XOR cellular automata', () => {

  test('play', () => {
    const iterator = automata();

    for (let i=0; i < 4; i++) {
      console.log(iterator());
    }
  });

});

