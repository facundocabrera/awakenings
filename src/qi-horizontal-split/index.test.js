import { split } from ".";

describe("qi-horizontal-split", () => {
  it("should split horizontally by 2", () => {
    // centroid [5, 5]
    const slots = split([0, 0], [10, 10]);

    expect(slots[0]).toEqual([
      [0, 0],
      [5, 0],
      [5, 10],
      [0, 10],
    ]);

    expect(slots[1]).toEqual([
      [5, 0],
      [10, 0],
      [10, 10],
      [5, 10],
    ]);
  });

  it("should split horizontally by 2", () => {
    // centroid [10, 10]
    const slots = split([5, 5], [15, 15]);

    expect(slots[0]).toEqual([
      [5, 5],
      [10, 5],
      [10, 15],
      [5, 15],
    ]);

    expect(slots[1]).toEqual([
      [10, 5],
      [15, 5],
      [15, 15],
      [10, 15],
    ]);
  });
});
