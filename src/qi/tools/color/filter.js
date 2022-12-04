const filter = ([r, g, b, a], [α, σ, δ, φ]) =>
  [r - r * α, g - g * σ, b - b * δ, a - a * φ].map(Math.round);

export default filter;
