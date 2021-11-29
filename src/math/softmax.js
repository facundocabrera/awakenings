/**
 * Sigue siendo muy sencible a la entrada, o se me va a precision para arriba,
 * o se me va para abajo en decimales.
 *
 * Experimentar acá:
 * https://www.desmos.com/calculator/wztrtco32d?lang=es
 */
export const exp_softmax = (logits) => {
  // Busco el valor maximo del vector
  const maxLogit = Math.max(...logits);

  // Ese maximo lo uso para calcular exp( distancia( vector[i], max(vector) ) )
  // con eso aparentemente prevengo NaN para el caso de valor muy grandes
  // Mirar el comportamiento de y = exp(x) para refrescar la grafica y ver el
  // comportamiento del output para determinados valores x
  const scores = logits.map((l) => Math.exp(l - maxLogit));

  // Hago la sumatoria para normalizar cada coordenada del vector
  const denom = scores.reduce((a, b) => a + b, 0.0);

  // Normalizo la salida
  return scores.map((s) => s / denom);
};

export const linear_softmax = (logits) => {
  // Hago la sumatoria para normalizar cada coordenada del vector
  const denom = logits.reduce((a, b) => a + b, 0.0);

  // Normalizo la salida
  return logits.map((s) => s / denom);
};
