/**
 * Notes:
 * 1. Building a 2D kernel from 2 equal evaluation make the result keep the
 *    normalization properties (sum eq 1)
 */
import { densify, kernel2D as k2d } from "./gaussian-kernel";

// import { sum_matrix } from "../geometry/vector";

describe("kernel2D", () => {
  test("sigma 0.54", () => {
    const K = k2d(0.54, 3, 3);

    expect(K).toMatchSnapshot();

    // console.log(sum_matrix(K)); ~1
  });

  test("sigma 0.66", () => {
    const K = k2d(0.66, 3, 3);

    expect(K).toMatchSnapshot();

    // console.log(sum_matrix(K)); ~1
  });

  test("sigma 0.33", () => {
    const K = k2d(0.33, 3, 3);

    expect(K).toMatchSnapshot();

    // console.log(sum_matrix(K)); ~1
  });

  test("sigma 0.618", () => {
    const K = k2d(0.618, 3, 3);

    expect(K).toMatchSnapshot();

    console.log(K);
  });
});

describe("densify", () => {
  test("sigma 0.54", () => {
    const K = k2d(0.54, 3, 3);
    const K2 = densify(K, [3, 3, 2]);

    expect(K2).toMatchSnapshot();
  });

  test.only("kernel 1", () => {
    const K = [
      [1, 0, -1],
      [0, 0, 0],
      [-1, 0, 1],
    ];

    const kd = densify(K, [3, 3, 4]);

    expect(kd).toMatchSnapshot();
  });
});
