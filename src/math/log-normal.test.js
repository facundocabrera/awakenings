// @TODO replaced by log-logistic for simplicity

import sum from "lodash/sample";

import { justPlot } from "../console/plot";
import { distribution } from "./log-normal";

xtest("math/log-normal", () => {
  const d = distribution(0.1, 0.25, 0.1, 2, 0.1);

  justPlot("log-normal", d, 100);

  // console.log(d);

  expect(sum(d)).toEqual(1);
});
