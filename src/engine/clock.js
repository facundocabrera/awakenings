function* fibonacci(n) {
  const infinite = !n && n !== 0;
  let current = 0;
  let next = 1;

  while (infinite || n--) {
    yield current;
    [current, next] = [next, current + next];
  }
}

function* inc(v) {
  let x = 0;

  while (true) {
    yield x;
    x += v;
  }
}

function* limitedInc(v, limit) {
  let x = 0;

  while (limit) {
    yield x;
    limit--;
    x += v;
  }
}

function* counterMode(n) {
  let counter = 0;

  while (true) {
    yield (counter % n) + 1;
    counter++;
  }
}

export { fibonacci, inc, limitedInc, counterMode };
