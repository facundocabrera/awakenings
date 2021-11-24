import { random_vector } from "../math/vector";
import { apply, Neuron, TrackNeuronActivationDomain } from "./neuron";

jest.mock("../math/vector");

beforeEach(() => {
  random_vector.mockImplementation((n) => Array(n).fill(1));
});

describe("Neuron", () => {
  it("should activate", () => {
    const n = Neuron({ connections: 3 });

    expect(n.activate([1, 2, 3])).toBeDefined();
    expect(n.activate([1, 2, 3])).toMatchSnapshot();
  });

  it("should expose internals", () => {
    const n = Neuron({ connections: 5 });

    expect(n.internals).toMatchSnapshot();
  });
});

describe("TrackNeuronActivationDomain", () => {
  it("should calculate min and max", () => {
    const n = TrackNeuronActivationDomain(Neuron({ connections: 3 }));

    n.activate([1, 2, 3]);
    n.activate([3, 2, 1]);

    expect(n.box()).toMatchSnapshot();
  });
});

describe("apply", () => {
  it("should scale the input by the weights", () => {
    expect(
      apply(
        [
          [1, 2], // * 0.3
          [3, 4], // * 0.7
        ],
        [0.3, 0.7]
      )
    ).toMatchSnapshot();
  });
});
