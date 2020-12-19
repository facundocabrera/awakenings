import { defaults } from "./defaults";

import { pick } from "../utils/array";

import { stops as circularStops } from "../geometry/circle";
import { omnitrix } from "../geometry/omnitrix";

import { multiByScalar } from "../geometry/scale";

const { PI, sin } = Math;

const mapping = [
  "#E32DD377",
  "#BF3EFA77",
  "#672DE377",
];

const yin = circularStops(3);
const yang = circularStops(3);

const width = time => 500 * sin(PI / 8 * time / 12);

const next = time => {
  const points = multiByScalar(
    omnitrix(yin, yang),
    width(time)
  );

  return {
    points
  };
};

const preset = defaults([{
  painter: "XY4",
  next
}]);

preset.background = "#000";
preset.frameRate = 15;

preset.setup = (canvas, global) => {
  canvas.rotate(PI / -2);
};

preset.draw = (context, time, canvas, global) => {
  canvas.clear();

  context.forEach(local => {
    const { points } = local.next(time);
  
    canvas.noFill();
    canvas.stroke(pick(mapping, time));
    canvas.strokeWeight(1);
    
    canvas.beginShape();
    points.forEach(p => { 
      canvas.vertex(...p);      
    });
    canvas.endShape(global.CLOSE);
  });

};

export default preset;
