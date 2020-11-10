import { Binomial } from "../../random-walk/binomial-walker";

function* Sequencer(n, k, p, base) {
  const walker = Binomial(n, k, p);

  while ( true ) {
    const v = walker() % base;

    yield v;
  }
}

export {
  Sequencer
};