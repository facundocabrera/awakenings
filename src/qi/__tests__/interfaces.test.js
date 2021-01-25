import { Canvas, Painter, ComposePainter } from "../interfaces";

describe("Basic painting structure", () => {
  test("ComposePainter should allow to decorate an array of Painter", () => {
    const setup = jest.fn();
    const draw = jest.fn();

    const p1 = Painter({
      setup,
      draw,
    });
    const p2 = Painter({
      setup,
      draw,
    });

    const composed = ComposePainter([p1, p2]);

    composed.setup();
    expect(setup).toHaveBeenCalledTimes(2);

    composed.draw();
    expect(draw).toHaveBeenCalledTimes(2);
  });

  test("Canvas should decorate a ComposePainter", () => {
    const setup = jest.fn();
    const draw = jest.fn();

    expect(() => {
      Canvas(
        ComposePainter([
          Painter({ setup, draw }), // p1
          Painter({ setup, draw }), // p2
        ])
      );
    }).not.toThrow();
  });

  test("Canvas should decorate a Painter", () => {
    const setup = jest.fn();
    const draw = jest.fn();

    expect(() => {
      Canvas(Painter({ setup, draw }));
    }).not.toThrow();
  });
});
