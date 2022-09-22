import { read, set, scale, position } from "./pixel";
import { convolution, applyMatrix } from "./convolution";

describe("applyMatrix", () => {
  test("product between 2 matrixes", () => {
    const result = applyMatrix(
      [
        [2, 2],
        [4, 4],
      ],
      [
        [3, 3],
        [5, 5],
      ]
    );

    expect(result).toEqual([
      [6, 6],
      [20, 20],
    ]);
  });
});

describe("convolution", () => {
  test("4x4 convolution with 2x2", () => {
    const storage = Uint8ClampedArray.from([
      2, 2, 2, 2, 4, 4, 4, 4, 8, 8, 8, 8, 16, 16, 16, 16,
    ]);

    const sd = 1;
    const sw = 4;
    const sh = 4;

    const matrix = [
      [2, 2],
      [2, 2],
    ];

    expect(sw * sh * sd).toEqual(storage.length);

    convolution(storage, matrix, [sw, sh, sd], [2, 2, sd]);

    expect(storage).toEqual(
      Uint8ClampedArray.from([
        2 * 2,
        2 * 2,
        2 * 2,
        2 * 2,
        2 * 4,
        2 * 4,
        2 * 4,
        2 * 4,
        2 * 8,
        2 * 8,
        2 * 8,
        2 * 8,
        2 * 16,
        2 * 16,
        2 * 16,
        2 * 16,
      ])
    );
  });
});
