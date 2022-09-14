import { drawable } from "../drawable";
import { compose } from "../compose";

import { createTestableDrawables } from "./utils";

describe("compose", () => {
  it("should pass previous return value as parameter of the next in the chain", () => {
    const [s1, , i1] = createTestableDrawables(() => ({ x: 10 }));
    const [s2, , i2] = createTestableDrawables(({ x }) => ({ x: x + 2 }));
    const [s3, , i3] = createTestableDrawables(({ x }) => ({ x: x * 2 }));

    const composed = compose([i1, i2, i3]);

    const result = composed.setup();

    expect(s1).toBeCalledWith(undefined);
    expect(s2).toBeCalledWith({ x: 10 });
    expect(s3).toBeCalledWith({ x: 12 });
    expect(result).toEqual({ x: 24 });
  });

  it("should bypass arguments if the return value is undefined", () => {
    const d1 = drawable();
    const d2 = drawable();

    const c = compose([d1, d2]);

    const input = { p: 10 };

    const output = c.setup(input);

    expect(input).toEqual(output);
  });

  it("should bypass arguments if the return value is undefined", () => {
    const d2Args = { p: 10 };
    const s1 = jest.fn(() => d2Args);
    const s2 = jest.fn(() => {});

    const d1 = drawable(s1);
    const d2 = drawable(s2);

    const c = compose([d1, d2]);

    const output = c.setup();

    expect(s2).toBeCalledWith(d2Args);
    expect(d2Args).toEqual(output);
  });

  it('should throw on invalid drawable inputs', () => {
    expect(() => {
      compose([undefined]);
    }).toThrow();
  });
});
