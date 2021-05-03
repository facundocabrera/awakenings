import { words, names } from './espanol';
import { simplify } from './word-simplification';
import { mapping } from './word-to-number';

const isWord = word => !word.split('').some(char => mapping[char] === undefined);
const toLower = word => word.toLowerCase();
const toSimplest = word => toLower(word).split('').map(simplify).join('');

const toSimplified = words => words.filter(isWord).map(toSimplest);

const w = toSimplified(words);
const n = toSimplified(names);

export {
  w as words,
  n as names
};
