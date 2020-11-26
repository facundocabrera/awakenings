import { EscaleraWalker } from "../random-walk/escalera-walker";

function* EscaleraSequencer(n) {
  const walker = EscaleraWalker(n);

  while (true) {
    const v = walker();

    console.log(v);

    yield v;
  }
}

export { EscaleraSequencer };
