import { Sequencer } from "./sequencer";

test("sequencer", () => {
  const s = Sequencer([0, 0], [100, 100]);

  expect(s.next().value).toEqual([
    [0, 0],
    [50, 0],
    [50, 50],
    [0, 50],
  ]);
  expect(s.next().value).toEqual([
    [50, 0],
    [100, 0],
    [100, 50],
    [50, 50],
  ]);
  expect(s.next().value).toEqual([
    [50, 50],
    [100, 50],
    [100, 100],
    [50, 100],
  ]);
  expect(s.next().value).toEqual([
    [0, 50],
    [50, 50],
    [50, 100],
    [0, 100],
  ]);

  expect(s.next().value).toEqual([
    [0, 0],
    [25, 0],
    [25, 25],
    [0, 25],
  ]);
  expect(s.next().value).toEqual([
    [25, 0],
    [50, 0],
    [50, 25],
    [25, 25],
  ]);
  expect(s.next().value).toEqual([
    [25, 25],
    [50, 25],
    [50, 50],
    [25, 50],
  ]);
  expect(s.next().value).toEqual([
    [0, 25],
    [25, 25],
    [25, 50],
    [0, 50],
  ]);
});
