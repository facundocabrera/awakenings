function* fibonacci(n) {
  const infinite = !n && n !== 0;
  let current = 1;
  let next = 1;

  while (infinite || n--) {
    yield current;
    [current, next] = [next, current + next];
  }
}

function sequenceOf(length) {
  const s = [];
  const gen = fibonacci(length);

  for(let v of gen) {
    s.push(v);
  }

  return s;
}

function ratios(accuracy = 27, nFollowing = 9) {
  const s = sequenceOf(accuracy);
  const r = [];
  let last = accuracy - 1;
  let previous = last - 1;

  while(last - previous <= nFollowing) {
    r.push(s[previous] / s[last]);
    previous--;
  }

  return r;
}

export {
  fibonacci,
  sequenceOf,
  ratios
};