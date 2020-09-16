// https://en.wikipedia.org/wiki/Benford's_law

const idealDistribution = [1,2,3,4,5,6,7,8,9].map(d => Math.log10(1 + 1 / d));

const Benford = ({
  errorMargin = 0.01 // 1% of error 
} = {}) => {
  const stats = [0,0,0,0,0,0,0,0,0];
  let counter = 0;

  const add = (n) => {
    const digit = (n + "")[0];
    
    if (digit < 1) {
      throw `first digit must be 1,2,3,4,5,6,7,8,9 given ${n}`;
    }

    stats[digit - 1]++;
    counter++;
  };

  const ideal = () => idealDistribution;

  const distribution = () => {
    return stats.map(s => s / counter);
  };

  const diff = () => {
    let index = 0;

    const current = distribution();
    const limit = current.length;
    
    const diff = new Array(9);

    while (index < limit) {
      diff[index] = idealDistribution[index] - current[index];
      index++;
    }

    return diff;
  };

  const obeyTheLaw = () => {
    let obey = true;
    let index = 0;

    const current = distribution();
    const limit = current.length;
    
    while (obey && index < limit) {
      obey = Math.abs(idealDistribution[index] - current[index]) < errorMargin;
      index++;
    }

    return obey;
  };

  return {
    add,
    distribution,
    obeyTheLaw,
    ideal,
    diff
  }
};

export {
  Benford
}