import { BenfordWalkerN } from "../../random-walk/benford-walker-n";

function* Sequencer(numericBase) {
  const walker = BenfordWalkerN(numericBase);

  while ( true ) {
    const v = walker();

    // console.log(v);

    yield v;
  }
}

export {
  Sequencer
};