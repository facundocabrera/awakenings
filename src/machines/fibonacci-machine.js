import { FibonacciWalker } from "../random-walk/fibonacci-walker";

function* Sequencer(n) {
  const walker = FibonacciWalker(n);

  while (true) {
    const v = walker();

    // console.log(v);

    yield v;
  }
}

export { Sequencer };
