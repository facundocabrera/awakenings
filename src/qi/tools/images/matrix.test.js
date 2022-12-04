import { densify, kernel } from "./gaussian-kernel";
import { convolutè } from "./matrix";

describe("Apply", () => {
  test("calculate new center pixel colors", () => {
    const shape = [3, 3, 1];
    const K = [
      [1, 0, -1],
      [0, 0, 0],
      [-1, 0, 1],
    ];

    const neighborhood = [
      [0, 0, 1],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const pixel = convolutè(neighborhood, K, shape);

    expect(pixel).toEqual([-1]);
  });

  test("calculate new center pixel colors", () => {
    const shape = [3, 3, 2];
    const K = densify(
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      shape
    );

    const neighborhood = densify(
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      shape
    );

    const pixel = convolutè(neighborhood, K, shape);

    expect(pixel.length).toBe(shape[2]);
    expect(pixel).toEqual([1, 1]);
  });
});
