import { Binomial } from "../../random-walk/binomial-walker";

function* Sequencer(n, p) {
  const walker = Binomial(n, p);

  while (true) {
    const v = walker();

    yield v;
  }
}

export { Sequencer };
