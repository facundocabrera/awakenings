import log from "./log";

/**
 * Self-information of an event.
 * 
 * @param {Number} probability of the event
 * @param {Number} base unit of self-information
 */
const I = (probability, base) => -1 * log(probability, base);

/**
 * Entropy.
 * 
 * Se puede interpretar como el valor esperado para un conjunto de 
 * self-informative events. Basicamente es la mean usando la funcion I.
 * 
 * @param {Array} distribution probabilities for each different event
 * @param {Number} base base to be used in the log calculation
 * 
 * @returns entropy Number between [0, 1]
 */
const H = (distribution, base = 10) => distribution.reduce(
  (h, p) => h -= p * log(p, base), 0
);

export {
  I,
  H
};