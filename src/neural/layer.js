import { range } from "lodash";
import { Neuron } from "./neuron";
import { modulo } from "../geometry/vector";

export const Layer = ({ name = "LAYER_NAME", inputs = 10, neurons = 10 }) => {
  const cluster = range(neurons).map(() => Neuron({ connections: inputs }));

  const activate = (inputs) =>
    cluster.reduce((outputs, neuron) => {
      outputs.push(
        // como estoy usando un centroid, necesito aplicar una transformación
        // mas, porque solo propago valores 1D.
        modulo(
          // esto puede ser un metodo o `neuron(inputs)`
          ...neuron.activate(inputs)
        ) * 33 // magic number
      );
      return outputs;
    }, []);

  return {
    name,
    activate,
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
