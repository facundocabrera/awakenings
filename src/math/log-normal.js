// @TODO replaced by log-logistic for simplicity

const { PI, log, pow, sqrt, exp } = Math;

const sampler = (fn, xStart, xEnd, dx) => {
  const samples = [];

  for (let x = xStart; x <= xEnd; x += dx) {
    samples.push(fn(x));
  }

  return samples;
};

const logNormal = (μχ, σχ) => {
  if (!(μχ > 0 && σχ > 0)) throw "μχ and σχ must be greater than 0";

  const μ = log(pow(μχ, 2) / sqrt(pow(μχ, 2) + pow(σχ, 2)));
  const σ = sqrt(log(1 + pow(σχ, 2) / pow(μχ, 2)));

  const σSqrt2PI = σ * sqrt(2 * PI);
  const twoσSquare = 2 * pow(σ, 2);

  const density = (x) =>
    (1 / x) * (1 / σSqrt2PI) * exp((-1 * pow(log(x) - μ, 2)) / twoσSquare);

  return density;
};

const distribution = (μχ, σχ, xStart, xEnd, dx) => {
  const ln = logNormal(μχ, σχ);

  return sampler(ln, xStart, xEnd, dx);
};

export { distribution };
