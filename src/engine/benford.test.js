// https://en.wikipedia.org/wiki/Benford's_law

import { Benford } from "./benford";
import { fibonacci } from "./clock";

describe("engine/benford/base", () => {
  test("Lets play a game with benford", () => {
    const b = Benford();

    expect(b.obeyTheLaw()).toBe(false);
  });

  test("dummy try", () => {
    const b = Benford();

    b.add(1);
    b.add(2);

    const result = b.distribution();

    expect(result).toEqual([0.5, 0.5, 0, 0, 0, 0, 0, 0, 0]);
  });

  test("fibonacci obey benford law", () => {
    const b = Benford();

    const it = fibonacci();
    it.next();

    let breaker = 0;

    for (const n of it) {
      b.add(n);
      breaker++;

      // needs more iterations than 2^n to apply the law
      if (breaker == 1000) break;
    }

    b.plot("fibonacci obey benford law");

    expect(b.obeyTheLaw()).toBe(true);
  });

  // reference https://oeis.org/A008952
  test("2^n", () => {
    // Podes probar con cualquier valor n > 1
    const x = 2;
    const b = Benford();

    let v = 1,
      i = 1;

    while (Number.isFinite(v)) {
      b.add(v);
      i++;
      v = Math.pow(x, i);
    }

    b.plot("2^n");

    expect(b.obeyTheLaw()).toBe(true);
  });
});

describe("engine/benford/experiments", () => {
  test("spring obey benford law? => no idea how to make it fit with the scheme for now 👁", () => {
    const b = Benford({
      errorMargin: 0.01,
    });

    const A = 100000; // decimal shift => manually defined to make it work
    const spring = (time) => A * Math.cos(2 * Math.PI * Math.sqrt(5) * time);

    for (let time = 1; time < 1000; time++) {
      b.add(spring(time));
    }

    b.plot("does spring equation obey benford law?");

    expect(b.obeyTheLaw()).toBe(false);
  });

  test("A * Math.pow(Math.sin( t * Math.PI ), 2) / Math.sqrt(t)", () => {
    const b = Benford();

    const A = 100000; // decimal shift => manually defined to make it work
    const fn = (t) => (A * Math.pow(Math.sin(t * Math.PI), 2)) / Math.sqrt(t);

    for (let time = 1; time < 1000000; time++) {
      b.add(fn(time));
    }

    b.plot(
      "A * Math.pow(Math.sin( t * Math.PI ), 2) / Math.sqrt(t) benfordable?"
    );

    // parcialmente verdadero, si aumento las iteracion no se mantiene positivo el resultado.
    expect(b.obeyTheLaw()).toBe(true);
  });

  test("interesting 👁", () => {
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

    expect(b.obeyTheLaw()).toBe(false);
  });
});

describe("engine/benford/p-adic", () => {
  test("fibonacci % base", () => {
    const base = 8;

    const b = Benford({
      errorMargin: 0.01,
      base,
    });

    const it = fibonacci();
    it.next();

    let breaker = 0;

    for (const n of it) {
      b.add((n % (base - 1)) + 1);
      breaker++;

      if (breaker == 1000) break;
    }

    b.plot(`fibonacci % ${base}`);

    expect(b.obeyTheLaw()).toBe(false);
  });
});
