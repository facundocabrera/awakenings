import { fibonacci } from "../engine/clock";
import { Benford } from "../engine/benford";

const idealDistribution = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) =>
  Math.log10(1 + 1 / d)
);

const fib = fibonacci();

function* generator() {



  yield fib() % 9 + 1;

}

function probability() {

}

export {
  generator
}