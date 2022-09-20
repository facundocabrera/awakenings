import { read, set, scale, position } from "./pixel";

describe("position", () => {
  test("3x3 density 1", () => {
    const density = 1;
    const width = 3;
    const height = 3;

    // 3 * 3 * 1
    const storage = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(width * height * density).toEqual(storage.length);

    // every time Y changes we move a pack forward
    expect(position([0, 0], [width, density])).toBe(0);
    expect(position([1, 0], [width, density])).toBe(1);
    expect(position([2, 0], [width, density])).toBe(2);

    // every time Y changes we move a pack forward
    expect(position([0, 1], [width, density])).toBe(3);
    expect(position([1, 1], [width, density])).toBe(4);
    expect(position([2, 1], [width, density])).toBe(5);

    // every time Y changes we move a pack forward
    expect(position([0, 2], [width, density])).toBe(6);
    expect(position([1, 2], [width, density])).toBe(7);
    expect(position([2, 2], [width, density])).toBe(8);
  });

  test("3x3 density 2", () => {
    const density = 2;
    const width = 3;
    const height = 3;

    // 3 * 3 * 2
    const storage = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ];

    expect(width * height * density).toEqual(storage.length);

    expect(position([0, 0], [width, density])).toBe(0);
    expect(position([1, 0], [width, density])).toBe(2);
    expect(position([2, 0], [width, density])).toBe(4);

    expect(position([0, 1], [width, density])).toBe(6);
    expect(position([1, 1], [width, density])).toBe(8);
    expect(position([2, 1], [width, density])).toBe(10);

    expect(position([0, 2], [width, density])).toBe(12);
    expect(position([1, 2], [width, density])).toBe(14);
    expect(position([2, 2], [width, density])).toBe(16);
  });
});

describe("scale", () => {
  test("density 1", () => {
    const density = 1;
    const value = [1];

    expect(scale(value, density)).toEqual(value);
  });

  test("density 5", () => {
    const density = 5;
    const value = [1];

    expect(scale(value, density)).toEqual([1, 1, 1, 1, 1]);
  });
});

describe("set", () => {
  test("density 1", () => {
    const density = 1;
    const width = 3;
    const height = 3;

    // `.set` is only available on `TypedArray`
    const storage = Uint8ClampedArray.from([3, 3, 3, 2, 2, 2, 1, 1, 1]);

    const values = [9];

    expect(read(storage, [0, 0], [width, density])).toEqual(
      Uint8ClampedArray.from([3])
    );
    set(storage, [0, 0], [width, density], values);
    expect(read(storage, [0, 0], [width, density])).toEqual(
      Uint8ClampedArray.from(values)
    );

    expect(read(storage, [1, 1], [width, density])).toEqual(
      Uint8ClampedArray.from([2])
    );
    set(storage, [1, 1], [width, density], values);
    expect(read(storage, [1, 1], [width, density])).toEqual(
      Uint8ClampedArray.from(values)
    );
  });

  test("rgba", () => {
    const density = 4;
    const width = 3;
    const height = 3;

    // `.set` is only available on `TypedArray`
    const storage = Uint8ClampedArray.from([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);

    const values = [255, 255, 255, 144];

    expect(read(storage, [0, 0], [width, density])).toEqual(
      Uint8ClampedArray.from([0, 0, 0, 0])
    );
    set(storage, [0, 0], [width, density], values);
    expect(read(storage, [0, 0], [width, density])).toEqual(
      Uint8ClampedArray.from(values)
    );

    expect(read(storage, [2, 2], [width, density])).toEqual(
      Uint8ClampedArray.from([0, 0, 0, 0])
    );
    set(storage, [2, 2], [width, density], values);
    expect(read(storage, [2, 2], [width, density])).toEqual(
      Uint8ClampedArray.from(values)
    );
  });
});

describe("read", () => {
  test("density 1", () => {
    const density = 1;
    const width = 3;
    const height = 3;

    const storage = [3, 3, 3, 2, 2, 2, 1, 1, 1];

    expect(width * height * density).toEqual(storage.length);

    // Linear
    expect(read(storage, [0, 0], [3, 1])).toEqual([3]);
    expect(read(storage, [1, 0], [3, 1])).toEqual([3]);
    expect(read(storage, [2, 0], [3, 1])).toEqual([3]);

    expect(read(storage, [0, 1], [3, 1])).toEqual([2]);
    expect(read(storage, [1, 1], [3, 1])).toEqual([2]);
    expect(read(storage, [2, 1], [3, 1])).toEqual([2]);

    expect(read(storage, [0, 2], [3, 1])).toEqual([1]);
    expect(read(storage, [1, 2], [3, 1])).toEqual([1]);
    expect(read(storage, [2, 2], [3, 1])).toEqual([1]);
  });

  test("density 2", () => {
    const density = 2;
    const width = 3;
    const height = 3;

    const storage = [0, 0, 3, 3, 3, 3, 2, 2, 0, 0, 2, 2, 1, 1, 1, 1, 0, 0];

    expect(width * height * density).toEqual(storage.length);
    expect(read(storage, [0, 0], [width, density])).toEqual([0, 0]);
    expect(read(storage, [1, 1], [width, density])).toEqual([0, 0]);
    expect(read(storage, [2, 2], [width, density])).toEqual([0, 0]);
  });

  test("rgba", () => {
    const density = 4;
    const width = 3;
    const height = 3;

    const storage = [
      255, 255, 255, 144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255,
      144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 144,
    ];

    expect(width * height * density).toEqual(storage.length);
    expect(read(storage, [0, 0], [width, density])).toEqual([
      255, 255, 255, 144,
    ]);
    expect(read(storage, [1, 1], [width, density])).toEqual([
      255, 255, 255, 144,
    ]);
    expect(read(storage, [2, 2], [width, density])).toEqual([
      255, 255, 255, 144,
    ]);
  });

  test("out of range", () => {
    const density = 4;
    const width = 3;
    const height = 3;

    const storage = [
      255, 255, 255, 144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255,
      144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 144,
    ];

    expect(width * height * density).toEqual(storage.length);
    expect(read(storage, [9, 9], [width, density])).toEqual([]);
  });
});
