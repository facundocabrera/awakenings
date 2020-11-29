import { build, lengths, prob, angles } from "./model-binomial";

test("model/binomial", () => {
  let subsets = build(8);
  let l = lengths(subsets);
  let p = prob(subsets);
  let ang = angles(p);

  [subsets, l, p, ang].forEach(console.log);
});
