import { automata } from "./game";

describe("Sample of Binary XOR cellular automata", () => {
  test("play", () => {
    const iterator = automata(4);

    for (let i = 0; i < 8; i++) {
      console.log(iterator());
    }
  });
});
