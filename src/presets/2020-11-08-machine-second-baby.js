const { PI } = Math;

import { Sequencer } from "../machines/2020-11-10/sequencer";
import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";

import { defaults } from "./defaults";

const length = 10;
const base = 6;
const sequencer = Sequencer(100, 5, 5 / 100, base);
const points = stops(base);

const painter = 'Machine';
const color = '#FFFF3311';

const preset = defaults([
  {
    painter,
    color,
    base,
    sequencer,
    points
  },
]);

preset.background = '#000';
preset.frameRate = 30;

let last;

preset.draw = (context, time, canvas, global) => {
  canvas.clear();
  
  context.forEach(({ color, sequencer, points }) => {
    if (!last) {
      last = sequencer.next().value;
      return;
    }
    let current = sequencer.next().value;

    const [ from, to ] = multiByScalar(
      [ points[last], points[current] ],
      length
    );

    canvas.stroke(color);
    canvas.line(...from, ...to);
    
    canvas.translate(...to);
    canvas.rotate( current * (2 * PI / base) );

    last = current;
  });

};

export default preset;
