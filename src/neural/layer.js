import { range } from "lodash";

import { Neuron } from "./neuron";
import { modulo } from "../geometry/vector";

export const Layer = ({ name = "LAYER_NAME", inputs = 10, neurons = 10 }) => {
  // Neuron tiene que ser parametro
  const cluster = range(neurons).map(() => Neuron({ connections: inputs }));

  const activate = (inputs) =>
    cluster.reduce((outputs, neuron, index) => {
      const activation = neuron.activate(inputs);
      const output = modulo(...activation);

      outputs.push(output);

      return outputs;
    }, []);

  return {
    name, // nombre del layer para debugging
    activate, // evaluar vector de outputs dado un vector input
    internals: {
      layer: cluster, // expongo el vector de neuronas
    },
  };
};

export const Cluster = ({ name = "CLUSTER_NAME", layers = [] }) => {
  const compute = (inputs) => {
    layers.forEach((layer) => {
      inputs = layer.activate(inputs);
    });

    return inputs;
  };

  return {
    name,
    compute,
  };
};

Cluster.fromArray = (settings) => {
  const { length } = settings;
  const currentLayers = [];

  if (length < 3)
    throw Error("[ input, layer, output ] is the minimun acceptable");

  for (let i = 0; i < length - 1; i++) {
    currentLayers.push(
      Layer({ inputs: settings[i], neurons: settings[i + 1] })
    );
  }

  return Cluster({ layers: currentLayers });
};
