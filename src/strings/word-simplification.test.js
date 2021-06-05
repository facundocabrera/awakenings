import { simplify, removeVocals } from "./word-simplification";

it('should simplify words', () => {
  expect('díos'.split('').map(simplify).join('')).toBe('dios');
  expect('aguañón'.split('').map(simplify).join('')).toBe('aguanon');
  expect('aguará'.split('').map(simplify).join('')).toBe('aguara');
});

it('should remove vocals', () => {
  expect('dios'.split('').map(removeVocals).join('')).toBe('ds');
});