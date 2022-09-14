import { lerp, lerp2d, bezier2d } from "./lerp";

describe("LERP", () => {
  it("should do the math", () => {
    const p0 = 10;
    const p1 = 20;

    // t = 0 (min)
    expect(lerp(p0, p1, 0)).toBe(p0);
    // t = 1 (max)
    expect(lerp(p0, p1, 1)).toBe(p1);
  });

  it("calculate 2d lerp point", () => {
    const [x1, y1] = [-10, 10];
    const [x2, y2] = [10, 10];
    const t = 0.5;

    const x3 = lerp(x1, x2, t);
    const y3 = lerp(y1, y2, t);

    // es lo mismo que calcular el punto medio entre los 2 puntos iniciales
    expect([x3, y3]).toEqual(lerp2d([x1, y1], [x2, y2], t));
  });
});

describe("Bezier 2D", () => {
  const contract = (t, expected) => () => {
    const points = [
      [-10, 0],
      [0, 10],
      [10, 0],
    ];
    expect(bezier2d(points, t)).toEqual(expected);
  };

  it(
    "should build the bezier point of the curve at time t = 0",
    contract(0, [-10, 0])
  );
  it(
    "should build the bezier point of the curve at time t = 1",
    contract(1, [10, 0])
  );
  it(
    "should build the bezier point of the curve at time t = 0.5",
    contract(0.5, [0, 5])
  );
});
