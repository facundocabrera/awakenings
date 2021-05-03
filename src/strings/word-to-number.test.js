import { toNumber, mapping } from "./word-to-number";

it('should match mapping summatory', () => {
  expect(toNumber('dios')).toBe(mapping['d'] + mapping['i'] + mapping['o'] + mapping['s']);
  expect(toNumber('casa')).toBe(mapping['c'] + mapping['a'] + mapping['s'] + mapping['a']);
});

console.log(toNumber('camilo'));
console.log(toNumber('facundo'));
console.log(toNumber('milagros'));
console.log(toNumber('claudia'));
console.log(toNumber('maria'));
console.log(toNumber('mauricio'));
console.log(toNumber('luz'));
console.log(toNumber('alex'));
console.log(toNumber('argentina'));
console.log(toNumber('paris'));
console.log(toNumber('libertad'));
console.log(toNumber('china'));

console.log(toNumber('despertar'));
console.log(toNumber('servicio'));
console.log(toNumber('yoga'));
console.log(toNumber('reiki'));
console.log(toNumber('heladera'));
console.log(toNumber('emilio'));
console.log(toNumber('cabrera'));
console.log(toNumber('geometria'));

console.log(toNumber('kryon'));
console.log(toNumber('numerologia'));

console.log(toNumber('freya'));

console.log(toNumber('tierra'), toNumber('gaia'));

console.log(toNumber('camila'), toNumber('iris'));

console.log(toNumber('facundo'), toNumber('god'));

console.log(toNumber('i'), toNumber('o'));

console.log(toNumber('hecate'));
console.log(toNumber('llave'));
console.log(toNumber('escorpion'));

// antonimos
console.log(toNumber('amor'));
console.log(toNumber('odio'));

console.log(toNumber('dar'));
console.log(toNumber('tomar'), toNumber('quitar'), toNumber('robar'));

console.log(toNumber('amar'), toNumber('ver'));
console.log(toNumber('amar es ver'));