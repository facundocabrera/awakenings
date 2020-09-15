// https://en.wikipedia.org/wiki/Benford's_law

import { Benford } from './benford';
import { fibonacci } from './clock';

test('Lets play a game with benford', () => {
  const b = Benford();

  expect(b.obeyTheLaw()).toBe(false);
});

test('dummy try', () => {
  const b = Benford();

  b.add(1);
  b.add(2);

  expect(b.distribution()).toEqual([0.5,0.5,0,0,0,0,0,0,0]);
});

// reference https://oeis.org/A008952
test('2^n obey benford law', () => {
  const b = Benford({
    errorMargin: 0.01
  });

  for(let i=0; i < 100; i++) {
    b.add(Math.pow(2, i));
  }

  // console.log('ideal', b.ideal());
  // console.log('current', b.distribution());
  // console.log('diff', b.diff());

  expect(b.obeyTheLaw()).toBe(true);
});

test('fibonacci obey benford law', () => {
  const b = Benford({
    errorMargin: 0.01
  });

  const it = fibonacci();
  it.next();
  it.next();

  let breaker = 0;

  for(const n of it) {
    b.add(n);
    breaker++;

    // needs more iterations than 2^n to apply the law
    if (breaker == 200) break;
  }

  // console.log('ideal', b.ideal());
  // console.log('current', b.distribution());
  // console.log('diff', b.diff());

  expect(b.obeyTheLaw()).toBe(true);
});

test('spring obey benford law? => no idea how to make it fit with the scheme for now 👁', () => {
  const b = Benford({
    errorMargin: 0.01
  });

  const A = 100000; // decimal shift => manually defined to make it work
  const spring = (time) => A * Math.cos( (2 * Math.PI) * Math.sqrt( 5 ) * time );

  for(let time = 1; time < 1000; time++) {
    b.add(spring(time));
  }

  console.log('ideal', b.ideal());
  console.log('current', b.distribution());
  console.log('diff', b.diff());

  expect(b.obeyTheLaw()).toBe(false);
});