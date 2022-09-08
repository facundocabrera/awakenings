import { compose } from "../../flow/compose";
import { drawable } from "../../flow/drawable";

import { pushPop } from "../push-pop";

describe("push-pop", () => {
  it("should call push and pop before and after the draw", () => {
    const ctx = {
      push: jest.fn(),
      pop: jest.fn(),
    };

    const ctxProvider = drawable(() => ({ ctx }));

    const s = jest.fn();
    const d = jest.fn();

    const child = drawable(s, d);

    const composed = compose([ctxProvider, pushPop(child)]);

    composed.setup();
    composed.draw();

    expect(ctx.push).toHaveBeenCalledTimes(1);
    expect(d).toHaveBeenCalledTimes(1);
    expect(ctx.pop).toHaveBeenCalledTimes(1);
  });
});
