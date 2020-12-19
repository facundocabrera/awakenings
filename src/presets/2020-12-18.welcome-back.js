import { defaults } from "./defaults";

import { pick } from "../utils/array";

import { stops as circularStops } from "../geometry/circle";
import { stops as ellipticalStops } from "../geometry/ellipse";

import { omnitrix } from "../geometry/omnitrix";

import { multiByScalar } from "../geometry/scale";

const { PI, sin, cos, pow } = Math;

const mapping = [
  "#80FB2B77",
  "#CCE32777",
  "#FAE83777",
  "#E3B72777",
  "#FFB02977",
];

const yin = circularStops(12);
const yang = circularStops(12);

const width = time => 500 * pow(-1, time) * sin(PI * time / 144);

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
//   canvas.rotate(PI / -2);
};

preset.draw = (context, time, canvas, global) => {
//   if (time % 7 === 0) global.clear();
  
  canvas.clear();

  context.forEach(local => {
    const { points } = local.next(time);
  
    canvas.noFill();
    canvas.stroke(pick(mapping, time));
    canvas.strokeWeight(2);
    
    // canvas.beginShape();
    // points.forEach(p => { 
    //   canvas.vertex(...p);
    // });
    // canvas.endShape();

    points.forEach(p => { 
      canvas.ellipse(...p, width(time));
    });
  });

};

export default preset;
