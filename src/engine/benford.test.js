// https://en.wikipedia.org/wiki/Benford's_law

import { Benford } from "./benford";
import { fibonacci } from "./clock";

xtest("Lets play a game with benford", () => {
  const b = Benford();

  expect(b.obeyTheLaw()).toBe(false);
});

xtest("dummy try", () => {
  const b = Benford();

  b.add(1);
  b.add(2);

  expect(b.distribution()).toEqual([0.5, 0.5, 0, 0, 0, 0, 0, 0, 0]);
});

xtest("fibonacci obey benford law", () => {
  const b = Benford({
    errorMargin: 0.01,
  });

  const it = fibonacci();
  it.next();
  it.next();

  let breaker = 0;

  for (const n of it) {
    b.add(n);
    breaker++;

    // needs more iterations than 2^n to apply the law
    if (breaker == 1000) break;
  }

  console.log("fibonacci obey benford law");
  console.log(
    asciichart.plot(
      [b.distribution().map((v) => v * 100), b.ideal().map((v) => v * 100)],
      {
        colors: [asciichart.white, asciichart.green],
      }
    )
  );

  expect(b.obeyTheLaw()).toBe(true);
});

xtest("spring obey benford law? => no idea how to make it fit with the scheme for now 👁", () => {
  const b = Benford({
    errorMargin: 0.01,
  });

  const A = 100000; // decimal shift => manually defined to make it work
  const spring = (time) => A * Math.cos(2 * Math.PI * Math.sqrt(5) * time);

  for (let time = 1; time < 1000; time++) {
    b.add(spring(time));
  }

  console.log("does spring equation obey benford law?");
  console.log(
    asciichart.plot(
      [b.distribution().map((v) => v * 100), b.ideal().map((v) => v * 100)],
      {
        colors: [asciichart.white, asciichart.green],
      }
    )
  );

  expect(b.obeyTheLaw()).toBe(true);
});

xtest("A * Math.pow(Math.sin( t * Math.PI ), 2) / Math.sqrt(t)", () => {
  const b = Benford();

  const A = 100000; // decimal shift => manually defined to make it work
  const fn = (t) => (A * Math.pow(Math.sin(t * Math.PI), 2)) / Math.sqrt(t);

  for (let time = 1; time < 1000000; time++) {
    b.add(fn(time));
  }

  console.log(
    "A * Math.pow(Math.sin( t * Math.PI ), 2) / Math.sqrt(t) benfordable?"
  );
  console.log(
    asciichart.green,
    "Ideal in GREEN",
    asciichart.white,
    "Distribution in WHITE"
  );
  console.log(
    asciichart.plot(
      [b.distribution().map((v) => v * 100), b.ideal().map((v) => v * 100)],
      {
        colors: [asciichart.white, asciichart.green],
      }
    )
  );

  // parcialmente verdadero, si aumento las iteracion no se mantiene positivo el resultado.
  expect(b.obeyTheLaw()).toBe(true);
});

// reference https://oeis.org/A008952
test("Any exponencial > 1 applies for benford law", () => {
  // Cambiar X por cualquier valor > 1
  const x = (1 + Math.sqrt(5)) / 2;
  const b = Benford({
    errorMargin: 0.01,
  });

  let v = 1,
    i = 1;

  while (Number.isFinite(v)) {
    b.add(v);
    i++;
    v = Math.pow(x, i);
  }

  b.plot("Any exponencial > 1 applies for benford law");

  expect(b.obeyTheLaw()).toBe(true);
});

xtest("interesting 👁", () => {
  const b = Benford({
    errorMargin: 0.01,
  });

  let v = 1,
    i = 1;

  while (Number.isFinite(v)) {
    b.add(v);
    i++;
    v = Math.pow(2 / Math.pow(Math.cos((i * Math.PI) / 3), 2), i);
  }

  b.plot("interesting 👁");

  expect(b.obeyTheLaw()).toBe(true);
});

test("n! applies for benford law", () => {
  // Cambiar X por cualquier valor > 1
  const x = (1 + Math.sqrt(5)) / 2;
  const b = Benford({
    errorMargin: 0.01,
  });

  let v = Math.log(1) + Math.log(2) + Math.log(3),
    i = 4;

  let steps = 0;

  while (Number.isFinite(v) && steps < 10 * 1000 * 1000) {
    b.add(v);
    v += Math.log(i);
    steps++;
  }

  b.plot("n! applies for benford law");

  expect(b.obeyTheLaw()).toBe(true);
});
