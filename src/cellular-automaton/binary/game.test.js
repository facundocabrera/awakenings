import { automata } from "./game";

import { MonteCarlo } from "../../monte-carlo";

jest.mock("../../monte-carlo");

describe("Binary XOR cellular automata", () => {
  test("always 0", () => {
    MonteCarlo.mockReturnValue(() => 0);

    const iterator = automata();

    expect(iterator()).toEqual([0, 1]);
    expect(iterator()).toEqual([0, 0, 0, 1]);
    expect(iterator()).toEqual([0, 0, 0, 0, 0, 1]);
    expect(iterator()).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
  });

  test("always 1", () => {
    MonteCarlo.mockReturnValue(() => 1);

    const iterator = automata();

    expect(iterator()).toEqual([0, 1]);
    expect(iterator()).toEqual([1, 1, 1, 0]);
    expect(iterator()).toEqual([1, 1, 0, 0, 1, 0]);
  });
});
