import { LogLogisticWalker } from "../random-walk/log-logistic-walker";

function* Sequencer(α, β, base) {
  const walker = LogLogisticWalker(α, β, base);

  while (true) {
    const v = walker();

    // console.log(v);

    yield v;
  }
}

export { Sequencer };
