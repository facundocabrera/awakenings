import { exp_softmax, linear_softmax } from "./softmax";

// validar que la suma de las probabilidades esta cerca de 1 con un margen
// error por precision en los calculos
const assert = (value, expected = true) => {
  expect(1 - value < 0.0001).toBe(expected);
};

describe("math/softmax/comparison", () => {
  it("test 1", () => {
    // numeros que no varian mucho entre si
    const v = [1, 2, 1, 2, 3];

    const exp = exp_softmax(v);
    const linear = linear_softmax(v);

    assert(exp.reduce((a, b) => a + b, 0));
    assert(linear.reduce((a, b) => a + b, 0));
  });

  it("test 2", () => {
    // ahora con numeros alternados y similares
    const v = [-1, 1, -1, 1, -1, 1];

    const exp = exp_softmax(v);
    const linear = linear_softmax(v);

    // mantiene la distribución de prob muy bien, no le afectan los negativos
    // por ahora.
    assert(exp.reduce((a, b) => a + b, 0));

    // el linear se rompe son los negativos
    assert(
      linear.reduce((a, b) => a + b, 0),
      false
    );
  });

  it("test 3", () => {
    // mas o menos entre -2 y 2 se maneja bastante bien
    // exp_softmax, si importarte los negativos.
    const v = [-2, 2, -2, 2, -2, 2];

    const exp = exp_softmax(v);
    const linear = linear_softmax(v);

    // mantiene la distribución de prob muy bien, no le afectan los negativos
    // por ahora.
    assert(exp.reduce((a, b) => a + b, 0));

    // el linear se rompe son los negativos
    assert(
      linear.reduce((a, b) => a + b, 0),
      false
    );
  });
});
