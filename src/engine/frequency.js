function harmonic({ freq, phase = 0, radius }) {
  const fnId = _.uniqueId();

  function fn(time) {
    // const arc = 2 * PI * (1 / freq) * time + phase;
    const arc = 2 * Math.PI * freq * time + phase;
    const x = radius * Math.cos(arc); /* * 1 / (time % freq)*/
    const y = radius * Math.sin(arc); /* * 1 / (time % freq) */
    fn.history = {
      arc,
      x,
      y,
    };

    return {
      arc,
      x,
      y,
    };
  }

  fn.freq = freq;
  fn.radius = radius;
  fn.history = null;

  fn.toString = () => fnId;
  fn.valueOf = () => freq;

  return fn;
}

function polar(arc, radius) {
  const x = radius * Math.cos(arc);
  const y = radius * Math.sin(arc);

  return {
    arc,
    x,
    y,
  };
}

function classicFrequencyMapping(time) {
  const { freq, phase = 0, radius = 0 } = this;

  const arc = 2 * Math.PI * freq * time + phase;
  const { x, y } = polar(arc, radius);

  return {
    arc,
    x,
    y,
  };
}

function classicFrequencyMapping2(time) {
  const { x, y } = classicFrequencyMapping.apply(this, [time]);

  return [x, y];
}

// https://en.wikipedia.org/wiki/Hooke%27s_law
// Harmonic oscillator
function hookeLawHarmonicOscillator(time) {
  const { freq, radius = 0 } = this;

  // Adapte el movimiento armonico de un oscilador
  const arc = (1 / (2 * Math.PI)) * Math.sqrt(freq) * time;
  const { x, y } = polar(arc, radius);

  return {
    arc,
    x,
    y,
  };
}

function unstablePhase(time) {
  const { freq, phase = 0, radius = 0 } = this;

  const arc = 2 * Math.PI * freq * time + Math.sqrt(phase * time);
  const { x, y } = polar(arc, radius);

  return {
    arc,
    x,
    y,
  };
}

function unstablePhase2(time) {
  const { x, y } = unstablePhase.apply(this, [time]);

  return [x, y];
}

function elliptic(time) {
  const { freq, phase = 0, radius = 0 } = this;

  const arc = 2 * Math.PI * (1 / freq) * time + phase;
  const y = radius * Math.cosh(0.5) * Math.cos(arc);
  const x = radius * Math.sinh(0.3) * Math.sin(arc);

  return {
    arc,
    x,
    y,
  };
}

function kepler(time) {
  const { freq, phase = 0, radius = 0, e = 0.707 } = this;

  const arc = 2 * Math.PI * freq * time + phase;
  const y = radius * Math.cos(arc);
  const x = radius * Math.sqrt(1 - Math.pow(e, 2)) * Math.sin(arc);

  return {
    arc,
    x,
    y,
  };
}

function kepler2(time) {
  const { x, y } = kepler.apply(this, [time]);

  return [x, y];
}

function plusplus(time) {
  const { freq1, freq2, phase, radius } = this;

  const f1 = classicFrequencyMapping.apply(
    {
      freq: freq1,
      phase,
      radius,
    },
    [time]
  );
  const f2 = classicFrequencyMapping.apply(
    {
      freq: freq2,
      phase,
      radius,
    },
    [time]
  );

  return {
    arc: f1.arc + f2.arc,
    x: (f1.x + f2.x) / 2,
    y: (f1.y + f2.y) / 2,
  };
}

function ln(time) {
  // BE SMART
  // 👁 w es un NUMERO ENTERO que lo podemos ver como el radio.
  // 👁 k es una FRACCION que controla el desarrollo del espiral.
  const { w, k, freq, phase = 0 } = this;

  const l = time * Math.PI * freq + phase;

  const { x, y } = polar(l, w * Math.exp(k * l));

  return [x, y];
}

// https://en.wikipedia.org/wiki/Archimedean_spiral
//
// The normal Archimedean spiral occurs when c = 1. Other spirals falling into this group include the hyperbolic
// spiral (c = −1), Fermat's spiral (c = 2), and the lituus (c = −2). Virtually all static spirals appearing in nature
// are logarithmic spirals, not Archimedean ones. Many dynamic spirals (such as the Parker spiral of the solar wind,
// or the pattern made by a Catherine's wheel) are Archimedean.
//
// Changing the parameter a moves the centerpoint of the spiral outward from the origin (positive a toward 0 and 
// negative a toward π), while b controls the distance between loops.
function archimedean(time) {
  const { a, b, c = 1, freq, phase = 0 } = this;

  let r;

  const θ = time * Math.PI * freq + phase;

  if (c === 1) r = a + b * θ;
  else r = a + b * Math.pow(θ, 1 / c);

  const { x, y } = polar(θ, r);

  return [x, y];
}

export {
  harmonic,
  polar,
  classicFrequencyMapping,
  classicFrequencyMapping2,
  hookeLawHarmonicOscillator,
  unstablePhase,
  unstablePhase2,
  elliptic,
  kepler,
  kepler2,
  plusplus,
  ln,
  archimedean
};
