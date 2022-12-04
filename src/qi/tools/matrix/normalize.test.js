import normalize from "./normalize";

describe("normalize", () => {
  test("easy one", () => {
    const result = normalize([
      [1, 0],
      [0, 1],
    ]);

    expect(result).toEqual([
      [0.5, 0],
      [0, 0.5],
    ]);
  });

  test("second easy", () => {
    const result = normalize([
      [0, 0.25, 0],
      [0.25, 0, 0.25],
      [0, 0.25, 0],
    ]);

    expect(result).toEqual([
      [0, 0.25, 0],
      [0.25, 0, 0.25],
      [0, 0.25, 0],
    ]);
  });

  test("negative values", () => {
    /**
     * Normalizing negative data.
     *
     * The solution is simple: Shift your data by adding all numbers with the
     * absolute of the most negative (minimum value of your data) such that
     * the most negative one will become zero and all other number become
     * positive. Then you can normalize your data as usual with any of
     * above procedures.
     */
    expect(true).toBe(false);
  });
});
