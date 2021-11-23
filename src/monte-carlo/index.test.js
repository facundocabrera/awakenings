import { isInteger } from "lodash";
import { MonteCarlo, MonteCarloVector, AsyncMonteCarloVector } from "./index";

const assert = (vector) =>
  vector.forEach((v) => {
    expect(Number.isInteger(v)).toBe(true);
  });

describe("MonteCarlo", () => {
  it("should generate 50%, 50% with an error less than 1%", () => {
    const outputs = {
      1: 0,
      2: 0,
    };
    const walker = MonteCarlo([0.5, 1], [1, 2]);

    for (let index = 0; index < 100000; index++) {
      outputs[walker()]++;
    }

    const error = Math.abs(outputs[1] - outputs[2]) / (outputs[1] + outputs[2]);

    // Por lo menos espero tener un error menor al 1%
    expect(error < 0.01).toBe(true);
  });
});

describe("MonteCarloVector", () => {
  it("should generate an random vector using monte carlo simulation", () => {
    const walker = MonteCarloVector([0.5, 1], [10, 20], 3);

    assert(walker());
  });
});

describe("AsyncMonteCarloVector", () => {
  it("benchmark async generation of random vector", async () => {
    const amcv = AsyncMonteCarloVector(
      [0.1, 0.3, 0.4, 0.6, 0.8, 0.88, 0.97, 1],
      [1, 2, 3, 4, 5, 6, 7, 8],
      100
    );

    const vector = await amcv();

    assert(vector);
  });
});
