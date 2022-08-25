import { words, names } from "./espanol";
import { transformToConsumableChar } from "./word-simplification";
import { mapping } from "./word-to-number";

const isWord = (word) =>
  !word.split("").some((char) => mapping[char] === undefined);
const toLower = (word) => word.toLowerCase();
const toSimplest = (word) =>
  toLower(word).split("").map(transformToConsumableChar).join("");

const toSimplified = (words) => words.map(toSimplest).filter(isWord);

const w = toSimplified(words);
const n = toSimplified(names);

export { toSimplest, toSimplified, w as words, n as names };
