import { chain } from "../chain";

import { createTestableDrawables } from "./utils";

describe("chain", () => {
  it("should work with only 1 drawable instance", () => {
    const [s1, d1, i1] = createTestableDrawables();
    const chained = chain([i1]);

    chained.setup();
    chained.draw();

    // `.reduce` instantly returns if the collection has only one element, no loop executed.
    expect(i1).toBe(chained);
    [s1, d1].map((fn) => expect(fn).toHaveBeenCalledTimes(1));
  });

  it("should work with multiple instances as well", () => {
    const [s1, d1, i1] = createTestableDrawables();
    const [s2, d2, i2] = createTestableDrawables();

    const chained = chain([i1, i2]);

    chained.setup();
    chained.draw();

    [s1, s2, d1, d2].map((fn) => expect(fn).toHaveBeenCalledTimes(1));
  });
});
