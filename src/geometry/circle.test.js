import { stops, vector_around } from "./circle";
import { scale2D } from "../vector/math";
import { fixed_vector } from "../math/vector";

test("stops", () => {
  const current = stops(300);
  const v = vector_around(1, 2 * Math.PI, 300, 0);

  expect(current.length).toBe(300);
  expect(v.length).toBe(300);

  expect(current).toMatchSnapshot();
  expect(v).toMatchSnapshot();
});

test("data type sanity check", () => {
  const current = stops(5000);

  current.forEach(([x, y]) => {
    expect(typeof x).toBe("number");
    expect(typeof y).toBe("number");
  });
});

test("stress", () => {
  const current = scale2D(stops(300), fixed_vector(300, 1));

  current.forEach(([x, y]) => {
    expect(Number.isNaN(x)).toBe(false);
    expect(Number.isNaN(y)).toBe(false);
  });
});
