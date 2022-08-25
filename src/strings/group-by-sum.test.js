import { groupBySum, toGroupLength } from "./group-by-sum";
import { words as espanol } from "./espanol-simplified";

it("should group", () => {
  const words = ["a", "a", "a"];

  expect(groupBySum(words)).toEqual({ 1: words });
});

it("should group all words", () => {
  expect(groupBySum(espanol)).toMatchSnapshot();
});

it("should transform groups arrays to array.length", () => {
  expect(toGroupLength(groupBySum(espanol))).toMatchSnapshot();
});

console.log(groupBySum(espanol)[131].length);
console.log(groupBySum(espanol)[131]);
