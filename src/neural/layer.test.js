import { random_vector } from "../math/vector";
import { Layer, Cluster } from "./layer";

jest.mock("../math/vector");

beforeEach(() => {
  random_vector.mockImplementation((n) => Array(n).fill(1));
});

describe("Layer", () => {
  it("create a group of neurons with the expected amount of inputs", () => {
    const l = Layer({ name: "TestingLayer", inputs: 5, neurons: 2 });

    expect(l.activate([1, 2, 3, 4, 5])).toMatchSnapshot();
  });
});

describe("Cluster", () => {
  it("build from array", () => {
    const c = Cluster.fromArray([3, 5, 2]);

    expect(c.compute([1, 2, 1])).toMatchSnapshot();
  });

  it("should work", () => {
    const c = Cluster.fromArray([300, 16, 16, 6]);
    const input = random_vector(300);

    console.log(c.compute(input));
  });
});
