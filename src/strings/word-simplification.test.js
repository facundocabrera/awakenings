import { transformToConsumableChar, removeVocals } from "./word-simplification";

it('should transform special characters', () => {
  expect('díos'.split('').map(transformToConsumableChar).join('')).toBe('dios');
  expect('aguañón'.split('').map(transformToConsumableChar).join('')).toBe('aguanon');
  expect('aguará'.split('').map(transformToConsumableChar).join('')).toBe('aguara');
  expect('propósito'.split('').map(transformToConsumableChar).join('')).toBe('proposito');
});

it('should remove vocals', () => {
  expect('dios'.split('').map(removeVocals).join('')).toBe('ds');
});