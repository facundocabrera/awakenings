import { read, set, scale, position, range, updateRange, neighbours } from "./pixel";

describe("neighbours", () => {
  test('2x2', () => {
    // 2x2 density = 1
    const storage = [
      1,2,
      3,4,
    ];
    const width = 2;
    const density = 1;

    expect(neighbours(storage, [width, density], [0, 0], [1, 1])).toEqual(
      [
        [0, 0, 0],
        [0, 1, 2],
        [0, 3, 4],
      ]
    );

    expect(neighbours(storage, [width, density], [1, 1], [1, 1])).toEqual(
      [
        [1, 2, 0],
        [3, 4, 0],
        [0, 0, 0],
      ]
    );
  });

  test('2x2x2', () => {
    // 2x2 density = 2
    const storage = [
      1,1,2,2,
      3,3,4,4
    ];
    const width = 2;
    const density = 2;

    expect(neighbours(storage, [width, density], [0, 0], [1, 1])).toEqual([
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 2, 2],
      [0, 0, 3, 3, 4, 4],
    ]);

    expect(neighbours(storage, [width, density], [1, 1], [1, 1])).toEqual([
      [1, 1, 2, 2, 0, 0],
      [3, 3, 4, 4, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]);
  });
});

describe("updateRange", () => {
  test("4x4 using 2x2", () => {
    const storage = Uint8ClampedArray.from([
      /*(0, 0)*/ 2, 2, 7, 7 /*(4, 0)*/, /*(0, 1)*/ 4, 4, 5, 5 /*(4, 1)*/,
      /*(0, 2)*/ 9, 9, 10, 10 /*(4, 2)*/, /*(0, 3)*/ 16, 16, 11, 11 /*(4, 3)*/,
    ]);
    const sd = 1;
    const sw = 4;
    const sh = 4;

    expect(sw * sh * sd).toEqual(storage.length);

    updateRange(
      storage,
      [0, 0],
      [
        [54, 54],
        [54, 54],
      ],
      [sw, sh, sd],
      [2, 2, 1]
    );

    const q1 = range(storage, [0, 0], [2, 2], [sw, sd]);
    expect(q1).toEqual([
      Uint8ClampedArray.from([54, 54]),
      Uint8ClampedArray.from([54, 54]),
    ]);

    updateRange(
      storage,
      [2, 2],
      [
        [54, 54],
        [54, 54],
      ],
      [sw, sh, sd],
      [2, 2, 1]
    );

    const q2 = range(storage, [2, 2], [4, 4], [sw, sd]);
    expect(q2).toEqual([
      Uint8ClampedArray.from([54, 54]),
      Uint8ClampedArray.from([54, 54]),
    ]);
  });

  test("2x2x2 using 2x2x2", () => {
    const storage = Uint8ClampedArray.from([
      /*(0, 0)*/ 2, 2, 7, 7 /*(1, 0)*/, /*(0, 1)*/ 4, 4, 5, 5 /*(1, 1)*/,
    ]);
    const sd = 2;
    const sw = 2;
    const sh = 2;

    const state = [
      [54, 54, 54, 54],
      [54, 54, 54, 54],
    ];

    expect(sw * sh * sd).toEqual(storage.length);

    updateRange(storage, [0, 0], state, [sw, sh, sd], [2, 2, 2]);

    const q1 = range(storage, [0, 0], [2, 2], [sw, sd]);
    expect(q1).toEqual([
      Uint8ClampedArray.from([54, 54, 54, 54]),
      Uint8ClampedArray.from([54, 54, 54, 54]),
    ]);
  });

  test("2x2x2 using 1x2x2", () => {
    const storage = Uint8ClampedArray.from([
      /*(0, 0)*/ 2, 2, 7, 7 /*(1, 0)*/, /*(0, 1)*/ 4, 4, 5, 5 /*(1, 1)*/,
    ]);
    const sd = 2;
    const sw = 2;
    const sh = 2;

    const state = [
      [54, 54],
      [54, 54],
    ];

    expect(sw * sh * sd).toEqual(storage.length);

    updateRange(storage, [0, 0], state, [sw, sh, sd], [1, 2, 2]);

    const q1 = range(storage, [0, 0], [2, 2], [sw, sd]);
    expect(q1).toEqual([
      Uint8ClampedArray.from([54, 54, 7, 7]),
      Uint8ClampedArray.from([54, 54, 5, 5]),
    ]);
  });

  test("2x2x2 using 1x2x2", () => {
    const storage = Uint8ClampedArray.from([
      /*(0, 0)*/ 2, 2, 7, 7 /*(1, 0)*/, /*(0, 1)*/ 4, 4, 5, 5 /*(1, 1)*/,
    ]);
    const sd = 2;
    const sw = 2;
    const sh = 2;

    const state = [
      [54, 54],
      [54, 54],
    ];

    expect(sw * sh * sd).toEqual(storage.length);

    updateRange(storage, [1, 0], state, [sw, sh, sd], [1, 2, 2]);

    const q1 = range(storage, [0, 0], [2, 2], [sw, sd]);
    expect(q1).toEqual([
      Uint8ClampedArray.from([2, 2, 54, 54]),
      Uint8ClampedArray.from([4, 4, 54, 54]),
    ]);
  });
});

describe("range", () => {
  test("4x4 using 2x2", () => {
    const storage = [
      /*(0, 0)*/ 2, 2, 7, 7 /*(4, 0)*/, /*(0, 1)*/ 4, 4, 5, 5 /*(4, 1)*/,
      /*(0, 2)*/ 9, 9, 10, 10 /*(4, 2)*/, /*(0, 3)*/ 16, 16, 11, 11 /*(4, 3)*/,
    ];
    const sd = 1;
    const sw = 4;
    const sh = 4;

    expect(sw * sh * sd).toEqual(storage.length);

    const q1 = range(storage, [0, 0], [2, 2], [sw, sd]);
    expect(q1).toEqual([
      [2, 2],
      [4, 4],
    ]);

    const q2 = range(storage, [2, 0], [4, 2], [sw, sd]);
    expect(q2).toEqual([
      [7, 7],
      [5, 5],
    ]);

    const q3 = range(storage, [0, 2], [2, 4], [sw, sd]);
    expect(q3).toEqual([
      [9, 9],
      [16, 16],
    ]);

    const q4 = range(storage, [2, 2], [4, 4], [sw, sd]);
    expect(q4).toEqual([
      [10, 10],
      [11, 11],
    ]);
  });

  test("4x4x2 using 2x2", () => {
    const storage = [
      /* (0,0) */ "a1",
      "a1",
      "b1",
      "b1",
      "c1",
      "c1",
      "d1",
      "d1" /* (4, 0) */,
      /* (0,1) */ "a2",
      "a2",
      "b2",
      "b2",
      "c2",
      "c2",
      "d2",
      "d2" /* (4, 1) */,
      /* (0,2) */ "a3",
      "a3",
      "b3",
      "b3",
      "c3",
      "c3",
      "d3",
      "d3" /* (4, 2) */,
      /* (0,3) */ "a4",
      "a4",
      "b4",
      "b4",
      "c4",
      "c4",
      "d4",
      "d4" /* (4, 3) */,
    ];

    const sw = 4;
    const sh = 4;
    const sd = 2;

    expect(sw * sh * sd).toEqual(storage.length);

    expect(range(storage, [0, 0], [2, 2], [sw, sd])).toEqual([
      ["a1", "a1", "b1", "b1"],
      ["a2", "a2", "b2", "b2"],
    ]);

    expect(range(storage, [2, 2], [4, 4], [sw, sd])).toEqual([
      ["c3", "c3", "d3", "d3"],
      ["c4", "c4", "d4", "d4"],
    ]);
  });

  test("4x4x4 using 2x2x4", () => {
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

    expect(width * height * density).toBe(storage.length);

    const r1 = range(storage, [0, 0], [2, 2], [width, density]);

    expect(r1).toEqual([
      Uint8ClampedArray.from([...black, ...white]),
      Uint8ClampedArray.from([...white, ...green]),
    ]);

    const r2 = range(storage, [1, 1], [2, 2], [width, density]);

    expect(r2).toEqual([Uint8ClampedArray.from([...green])]);

    const r3 = range(storage, [1, 1], [3, 3], [width, density]);

    expect(r3).toEqual([
      Uint8ClampedArray.from([...green, ...white]),
      Uint8ClampedArray.from([...white, ...black]),
    ]);

    const r4 = range(storage, [1, 1], [4, 4], [width, density]);

    expect(r4).toEqual([
      Uint8ClampedArray.from([...green, ...white, ...black]),
      Uint8ClampedArray.from([...white, ...black, ...white]),
      Uint8ClampedArray.from([...black, ...white, ...green]),
    ]);
  });
});

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
