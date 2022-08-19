/*
1. Genero 3 columnas p1, p2, p3 y calculo la entropia para la distribución.
2. p1, p2, p3 son generados de forma aleatoria.
3. calculo la entropia para {p1, p2, p3}

USAGE: `node bin.mjs > ./data.csv`
*/

const { log, random } = Math;

const generator = () => {
  const r1 = random();
  const r2 = random();

  const p1 = r1;
  const p2 = (1 - p1) * r2;
  const p3 = 1 - (p1 + p2);

  return [p1, p2, p3];
};

const H = (dist) =>
  dist.reduce((entropy, prob) => {
    entropy -= prob * log(prob);
    return entropy;
  }, 0);

process.stdout.write("p1,p2,p3,entropy\n");

for (let i = 1; i <= 10000; i++) {
  const dist = generator();
  const ent = H(dist);

  process.stdout.write([...dist, ent].join(",") + "\n");
}
