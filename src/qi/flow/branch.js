import { chain, compose } from "./";

export const branch = (input, ...branches) => compose([input, chain(branches)]);
