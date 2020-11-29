import chunk from "lodash/chunk";
import sum from "lodash/sum";

const segments = (sample, inSegments) => {
  const increment = Math.ceil(sample.length / inSegments);
  const resample = [];

  // indexes se manejan desde el 0
  for (let i = increment - 1; i < sample.length; i += increment) {
    resample.push(sample[i]);
  }

  if (resample.length < inSegments) resample.push(sample[sample.length - 1]);

  return resample;
};

const downsample = (sample, buckets) => {
  const perBucket = Math.round(sample.length / buckets);
  const chunks = chunk(sample, perBucket);

  return chunks.map((c) => sum(c));
};

const sample = (fn, xStart, xEnd, dx) => {
  const samples = [];

  for (let x = xStart; x <= xEnd; x += dx) {
    samples.push(fn(x));
  }

  return samples;
};

export { sample, downsample, segments };
