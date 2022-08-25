const { PI: pi, cos, sin } = Math;

export const PI = pi;

export const TWO_PI = 2 * pi;

export const HALF_PI = pi / 2;

// polar coordinates
export const polar = (arc, r) => [r * cos(arc), r * sin(arc), arc, r];

// frequency mapping
export const freqMapping = ({ time, freq, radius = 0, phase = 0 }) => polar(TWO_PI * freq * time + phase, radius);
