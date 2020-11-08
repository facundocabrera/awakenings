const { PI } = Math;

import { Sequencer } from "../machines/2020-11-05/sequencer";
import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";

import { defaults } from "./defaults";

const length = 20;
const base = 6;
const sequencer = Sequencer(base);
const points = stops(base - 1);

const painter = 'Machine';
const color = '#FFFF3355';

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
      [ points[last - 1], points[current - 1] ],
      length
    );

    canvas.stroke(color);
    canvas.line(...from, ...to);
    
    canvas.translate(...to);
    canvas.rotate( current * (2 * PI / (base - 1)) );

    last = current;
  });

};

export default preset;
