import { justPlot } from '../console/plot';
import { words } from './espanol';
import { simplify, removeVocals } from './word-simplification';
import { groupBySum, toGroupLength } from './group-by-sum';

// que pasaba si eliminaba las vocales que mayormente son eliminables del 
// idioma?
test('experiment', () => {
  const w = toGroupLength(groupBySum(
    words.map(
      word => word.split('').map(c => removeVocals(simplify(c))).join('')
    )
  ));
  
  const keys = Object.keys(w).map(Number).sort((a, b) => a-b);

  const chart = [];
  for(let k=0; k < keys.length;k++) {
    chart[k] = w[keys[k]];
  }

  justPlot('a ver que hay', chart, 1/20);
});
