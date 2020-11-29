import { range } from "lodash";
import { distribution, distance } from "./model-escalera";

test("model/escalera/distribution", () => {
  const d = distribution(7);

  expect(d).toEqual(
    [1 / 49, 3 / 49, 5 / 49, 7 / 49, 9 / 49, 11 / 49, 13 / 49].reverse()
  );
});

test("model/escalera/distribution", () => {
  const dd = range(3, 12, 2)
    .map((s) => distribution(s))
    .map((d) => distance(d));

  console.log(distance(dd));
});
