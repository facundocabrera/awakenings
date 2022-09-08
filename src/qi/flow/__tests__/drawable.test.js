import { drawable } from "../drawable";

describe("drawable", () => {
  test('default return', () => {
    const d = drawable();

    expect(d.setup()).toEqual({});
    expect(d.draw()).toEqual({});
  });
  
  it("should propagate args as a default implementation", () => {
    const d = drawable();

    expect(d.setup({ a: 10 })).toEqual({ a: 10 });
    expect(d.draw({ a: 10 })).toEqual({ a: 10 });
  });

  it("should hook my fns into an object", () => {
    const setup = jest.fn();
    const draw = jest.fn();

    const d = drawable(setup, draw);
    
    d.setup();
    d.draw();

    expect(setup).toHaveBeenCalledTimes(1);
    expect(draw).toHaveBeenCalledTimes(1);
  });
});
