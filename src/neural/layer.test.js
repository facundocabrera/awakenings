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

  it("should handle a large number of inputs", () => {
    const inputs = 300;
    const input = random_vector(inputs);

    const l = Layer({ name: "TestingLayer", inputs, neurons: 1 });

    expect(l.activate(input)).toMatchSnapshot();
  });
});

describe("Cluster", () => {
  it("build from array", () => {
    const c = Cluster.fromArray([3, 5, 2]);

    expect(c.compute([1, 2, 1])).toMatchSnapshot();
  });

  it("should work with large number of inputs", () => {
    // 300 inputs, 1 output
    const c = Cluster.fromArray([300, 1, 1]);
    const input = random_vector(300);

    expect(input).toMatchSnapshot();

    const [output] = c.compute(input);

    expect(Number.isNaN(output)).toBe(false);
  });
});
