import { omnitrix, omniBuilder, omniMiddleVector } from "./omnitrix";

test("omnitrix", () => {
  const p1 = [
    [1, 1],
    [2, 2],
  ];
  const p2 = [
    [3, 3],
    [4, 4],
  ];

  expect(omnitrix(p1, p2)).toEqual([
    [1, 3],
    [2, 4],
  ]);
});

test("omniBuilder", () => {
  const shapes = [
    [
      [1, 1],
      [2, 2],
    ],
    [
      [3, 3],
      [4, 4],
    ],
    [
      [5, 5],
      [6, 6],
    ],
  ];

  expect(omniBuilder(shapes, omniMiddleVector)).toEqual([
    [3.5, 3.5],
    [4.5, 4.5],
  ]);
});
