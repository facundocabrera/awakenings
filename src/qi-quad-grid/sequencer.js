import { grid } from ".";

const { floor } = Math;

const MAX_GRID_ITEMS = 4;

const entry = (quadIndex) => quadIndex % MAX_GRID_ITEMS; // rango entre 0 y 3
const generation = (quadIndex) => floor(quadIndex / MAX_GRID_ITEMS); // cada 4 aumento 1

function* Sequencer(from, to) {
  let quadIndex = 0;
  let quadGeneration = 0;
  let quadEntries = grid(from, to);
  let pendingExpansion = [...quadEntries];

  while (true) {
    const gen = generation(quadIndex);
    const index = entry(quadIndex);

    if (gen !== quadGeneration) {
      quadEntries = grid(
        pendingExpansion[gen - 1][0],
        pendingExpansion[gen - 1][2]
      );
      pendingExpansion = pendingExpansion.concat(quadEntries);
      quadGeneration = gen;
    }

    yield quadEntries[index];

    quadIndex++;
  }
}

export { Sequencer };
