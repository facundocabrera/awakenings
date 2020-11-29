// https://en.wikipedia.org/wiki/Log-logistic_distribution

import range from "lodash/range";
import { sample, downsample, segments } from "./sampling";

test("math/sample", () => {
  const fn = (x) => x;
  const s = sample(fn, 1, 10, 1);

  expect(s).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("math/downsample", () => {
  const input = downsample(
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    2
  );

  expect(input).toEqual([0.5, 0.5]);
});

test("math/downsample/rounded-grouping", () => {
  const input = downsample([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 3);

  expect(input).toEqual([4, 4, 3]);
});

test("math/downsample/half-half", () => {
  const sample = range(1, 5);
  const input = downsample(sample, 2);

  expect(input).toEqual([1 + 2, 3 + 4]);
});

test("math/segments", () => {
  const sample = range(1, 101);
  const input = segments(sample, 10);

  expect(input).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
});

test("math/segments", () => {
  const sample = range(1, 16);
  const input = segments(sample, 3);

  expect(input).toEqual([5, 10, 15]);
});

test("math/segments", () => {
  const sample = range(1, 16);
  const input = segments(sample, 4);

  expect(input).toEqual([4, 8, 12, 15]);
});
