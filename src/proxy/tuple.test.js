import tuple from "./tuple";

describe("tuple", () => {
  test("2x2x1", () => {
    const storage = [1, 2, 3, 4];
    const density = 1;
    const width = 2;

    const { t, c } = tuple([density, width], storage.length);

    expect(storage[t`${0}${0}`]).toBe(1);
    expect(storage[c(0, 0)]).toBe(1);

    expect(storage[t`${0}${1}`]).toBe(3);
    expect(storage[c(0, 1)]).toBe(3);
  });

  test("4x1", () => {
    const storage = [1, 2, 3, 4];
    const density = 1;

    const { t, c } = tuple([density], storage.length);

    for (let i = 0; i < storage.length; i++) {
      expect(storage[t`${i}`]).toBe(i + 1);
      expect(storage[c(i)]).toBe(i + 1);
    }
  });

  test("2x2", () => {
    const storage = [1, 2, 3, 4];
    const density = 2;

    const { t, c } = tuple([density], storage.length);

    expect(storage[t`${0}`]).toBe(1);
    expect(storage[c(0)]).toBe(1);

    expect(storage[t`${1}`]).toBe(3);
    expect(storage[c(1)]).toBe(3);
  });

  test("out of range", () => {
    const storage = [1, 2, 3, 4];
    const density = 2;

    const { t, c } = tuple([density], storage.length);

    expect(() => {
      t`${100}`;
    }).toThrow(Error);

    expect(() => {
      c(100);
    }).not.toThrow(Error);
  });
});
