import { justPlot } from '../console/plot';
import { sequenceOf } from '../math/fibonacci';

import { words as espanol } from './espanol-simplified';
import { groupBySum, toGroupLength } from './group-by-sum';

it('estas son las sumas que no estan presentes en el espanol simplified', () => {
  const entries = toGroupLength(
    groupBySum(espanol)
  );
  const len = Object.keys(entries).length;

  const outputs = [];

  for (let i = 1; i <= len; i++) {
    if (entries[i] === undefined) {
      outputs.push(i);
    }
  }

  expect(outputs).toEqual([
    230,
    231,
    233,
    241,
    250,
    251,
  ]);
});

it('should plot the group', () => {
  // usar zoom de la consola para que entre el grafico! (ctrl + -)
  
  const entries = toGroupLength(
    groupBySum(espanol)
  );
  const keys = Object.keys(entries).map(Number).sort((a, b) => a-b);

  const chart = [];
  for(let k=0; k < keys.length;k++) {
    chart[k] = entries[keys[k]];
  }

  justPlot('a ver que hay', chart, 1/20);
});

it('que palabras caen en numeros de fib', () => {
  const g = groupBySum(espanol);
  const n = sequenceOf(12).slice(1);

  // Hasta 144 deberia ser suficiente
  console.log(...n);

  const g2 = n.reduce((group, key) => {
    group[key] = g[key];

    return group;
  }, {});

  const l = toGroupLength(g2);

  // grupos que tengo de la serie de fib hasta el 144.
  console.log(g2);

  console.log(l);
});