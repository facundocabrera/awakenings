const { PI } = Math;

import { Sequencer } from "../machines/2020-11-05/sequencer";
import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";

import { defaults } from "./defaults";

const length = 20;
const base = 12;
const sequencer = Sequencer(base);
const points = stops(base - 1);

const painter = 'Machine';
const color = '#FAC32811';

const preset = defaults([
  {
    painter,
    color,
    base,
    sequencer,
    points
  },
]);

preset.canvasSize = [2 * 1080, 2 * 1080];
preset.frameRate = 15;

let last;

preset.draw = (context, time, canvas, global) => {
  context.forEach(({ color, sequencer, points }) => {
    if (!last) {
      last = sequencer.next().value;
      return;
    }
    let current = sequencer.next().value;

    // while ( current === last ) {
    //   current = sequencer.next().value;
    // }

    const [ from, to ] = multiByScalar(
      [ points[last - 1], points[current - 1] ],
      length
    );

    canvas.stroke(color);
    canvas.line(...from, ...to);
    canvas.translate(...to);
    
    canvas.rotate( 2 * PI / (base - 1) );

    last = current;
  });

};

export default preset;
