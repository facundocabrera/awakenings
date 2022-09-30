import { applyOpByRow, opMultRGBA } from "./matrix";
import { walker } from "./walker";

describe("walker", () => {
  test("walking", () => {
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

    const walk = walker(storage, [width, height, density], [2, 2]);

    const r1 = walk.next().value;
    expect(r1).toEqual([
      Uint8ClampedArray.from([...black, ...white]),
      Uint8ClampedArray.from([...white, ...green]),
    ]);

    const r2 = walk.next().value;
    expect(r2).toEqual([
      Uint8ClampedArray.from([...black, ...white]),
      Uint8ClampedArray.from([...white, ...black]),
    ]);

    const r3 = walk.next().value;
    expect(r3).toEqual([
      Uint8ClampedArray.from([...black, ...white]),
      Uint8ClampedArray.from([...white, ...black]),
    ]);

    const r4 = walk.next().value;
    expect(r4).toEqual([
      Uint8ClampedArray.from([...black, ...white]),
      Uint8ClampedArray.from([...white, ...green]),
    ]);

    expect(walk.next().done).toBe(true);
  });

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

    expect(width * height * density).toBe(storage.length);

    const walk = walker(storage, [width, height, density], [2, 2]);

    // 2x2x4
    // prettier-ignore
    const kernel = [
      [0.2, 0.2, 0.2, 0.8, 0.3, 0.3, 0.3, 0.8],
      [0.3, 0.3, 0.3, 1, 0.2, 0.2, 0.2, 1],
    ];

    let { value, done } = walk.next();
    while (!done) {
      // mutation are applied to value
      applyOpByRow(value, kernel, [2, 2, density], opMultRGBA);

      // the footprint is the mutation applied to value, so we feed it to be applied
      // to the same chunk (in this case the 2x2x4 matrix) returned by the iteration
      ({ value, done } = walk.next(value));
    }

    expect(storage).toMatchSnapshot();
  });
});
