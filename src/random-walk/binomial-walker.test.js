import sum from "lodash/sum";
import { Binomial } from "./binomial-walker";

test("random-walk/binomial", () => {
  const trials = 5;
  const success = 0.5;
  const occurences = new Array(trials).fill(0);

  const walker = Binomial(trials, success);

  const end = 1000;
  let counter = 0;

  while (counter < end) {
    occurences[walker()]++;
    counter++;
  }

  // Observar la campana que se genera en la distribucion de las ocurrencias
  // la joda viene por acá
  // console.log(occurences);

  expect(sum(occurences)).toBe(end);
  expect(occurences).toMatchSnapshot();
});
