import { Sequencer } from "./sequencer";

jest.mock("../../random-walk/benford-walker-n", () => ({
  BenfordWalkerN: () => () => 1,
}));

test("machines/2020-11-05/sequencer", () => {
  const s = Sequencer(10);

  expect(s.next().value).toBe(1);
  expect(s.next().value).toBe(1);
  expect(s.next().value).toBe(1);
});
