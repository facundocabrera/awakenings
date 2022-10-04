import { convolution, applyMatrix, rgbaConvolution } from "./convolution";
import { kernel2D, densify } from "./gaussian-kernel";

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

describe("rgba convolution", () => {
  test("footprint", () => {
    const black = [0, 0, 0, 255];
    const white = [255, 255, 255, 255];
    const green = [0, 255, 0, 255];

    // prettier-ignore
    const storage = Uint8ClampedArray.from([
      /*(0,0)*/ ...black, ...white, ...black, ...white /*(3,0)*/,
      /*(0,1)*/ ...white, ...green, ...white, ...black /*(3,1)*/,
      /*(0,2)*/ ...black, ...white, ...black, ...white /*(3,2)*/,
      /*(0,3)*/ ...white, ...black, ...white, ...green /*(3,3)*/,
    ]);
    const width = 4;
    const height = 4;
    const density = 4;

    // 2x2x4
    // prettier-ignore
    const kernel = [
      [0.2, 0.2, 0.2, 0.8, 0.3, 0.3, 0.3, 0.8],
      [0.3, 0.3, 0.3, 1, 0.2, 0.2, 0.2, 1],
    ];
    const kw = 2;
    const kh = 2;

    rgbaConvolution(storage, [width, height, density], kernel, [kw, kh]);

    expect(storage).toMatchSnapshot();
  });

  test("gaussian kernel", () => {
    const black = [0, 0, 0, 255];
    const white = [255, 255, 255, 255];
    const green = [0, 255, 0, 255];

    // prettier-ignore
    const storage = Uint8ClampedArray.from([
      /*(0,0)*/ ...black, ...white, ...black /*(3,0)*/,
      /*(0,1)*/ ...white, ...green, ...white /*(3,1)*/,
      /*(0,2)*/ ...black, ...white, ...black /*(3,2)*/,
    ]);
    const width = 3;
    const height = 3;
    const density = 4;

    const kernel = densify(kernel2D(0.54, 3, 3), [3, 3, 4]);
    const kw = kernel[0].length / density;
    const kh = kernel.length;

    console.log("storage", width, height, density);
    console.log("kernel", kw, kh, density);

    expect(storage.length).toBe(kw * kh * density);

    rgbaConvolution(storage, [width, height, density], kernel, [kw, kh]);

    console.log(storage);
  });
});
