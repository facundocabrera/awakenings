import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Painter, Canvas, ComposePainter } from "../../qi/interfaces";

import { GenericPainter } from '../2021-02-03-fourier-experiment';

const FRAME_RATE = 60;

// subir o bajar la calidad del dibujo.
const hq = 5;

// mirar el patron de frecuencias
const generator = (multipler, amplifier, seed) => ([
  { freq: multipler * seed * hq, radius: 100 },
  { freq: seed * hq, radius: 100 },
  { freq: -seed * hq, radius: 100 },
  { freq: multipler * amplifier * hq, radius: 100 },
]);

const multipler = 7;
const amplifier = 10;
const seed = amplifier * 15;

export const skeleton = ComposePainter([
  // GenericPainter(generator(multipler, amplifier, 10 * 9), "#7500F577"),
  GenericPainter(generator(multipler, amplifier, seed), "#F0EE1D77"),
  GenericPainter(generator(-1 * multipler, amplifier, seed), "#F0EE1D77"),
]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate: FRAME_RATE,
  })
);