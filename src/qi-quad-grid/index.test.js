import { grid } from "./";

describe("quad-grid", () => {
  it("should calculate 4 symetric squares", () => {
    const quad = grid([0, 0], [10, 10]);

    expect(quad).toEqual([
      [
        [0, 0],
        [5, 0],
        [5, 5],
        [0, 5],
      ],
      [
        [5, 0],
        [10, 0],
        [10, 5],
        [5, 5],
      ],
      [
        [5, 5],
        [10, 5],
        [10, 10],
        [5, 10],
      ],
      [
        [0, 5],
        [5, 5],
        [5, 10],
        [0, 10],
      ],
    ]);
  });

  it("should calculate 4 symetric squares", () => {
    const quad = grid([2, 2], [4, 4]);

    expect(quad).toEqual([
      [
        [2, 2],
        [3, 2],
        [3, 3],
        [2, 3],
      ],
      [
        [3, 2],
        [4, 2],
        [4, 3],
        [3, 3],
      ],
      [
        [3, 3],
        [4, 3],
        [4, 4],
        [3, 4],
      ],
      [
        [2, 3],
        [3, 3],
        [3, 4],
        [2, 4],
      ],
    ]);
  });
});
