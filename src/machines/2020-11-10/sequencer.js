import { Binomial } from "../../random-walk/binomial-walker";

function* Sequencer(n, p) {
  const walker = Binomial(n, p);

  while (true) {
    const v = walker();

    console.log(v);

    yield v;
  }
}

export { Sequencer };
