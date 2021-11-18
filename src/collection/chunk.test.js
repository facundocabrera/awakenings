import { grouping } from "./chunk";

describe("collection/chunk", () => {
  it("basic", () => {
    const g = grouping([1, 2, 3, 4], 3);

    expect(g).toEqual([[1, 2, 3], [4]]);
  });

  it("connected", () => {
    const g = grouping([1, 2, 3, 4], 2, true);

    expect(g).toEqual([
      [1, 2, 3],
      [3, 4],
    ]);
  });

  it("not connected and not checkBy", () => {
    const g = grouping([1, 2, 3, 4], 2, false, false);

    expect(g).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("connected and not checkBy", () => {
    const g = grouping([1, 2, 3, 4], 2, true, false);

    expect(g).toEqual([
      [1, 2, 3],
      [3, 4],
    ]);
  });

  it("connected and checkBy", () => {
    const g = grouping([1, 2, 3, 4], 2, true, true);

    expect(g).toEqual([[1, 2, 3]]);
  });
});
