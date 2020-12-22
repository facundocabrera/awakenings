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

const yin = circularStops(6);
const yang = circularStops(6);

const width = (time) => 1000 * pow(-1, time) * sin((PI * time) / 144);

const next = (time) => {
  const points = multiByScalar(omnitrix(yin, yang), width(time));

  return {
    points,
  };
};

const preset = defaults([
  {
    painter: "XY4",
    next,
  },
]);

preset.background = "#000";
preset.frameRate = 15;

preset.setup = (canvas, global) => {
  //   canvas.rotate(PI / -2);
};

preset.draw = (context, time, canvas, global) => {
  //   if (time % 7 === 0) global.clear();

  canvas.clear();
  canvas.noStroke();
  canvas.colorMode(global.HSB, 360, 100, 100, 1);

  const hue = (v) => v % 360;
  const saturation = (v) => v % 100;
  // const lightness = v => global.map(v, -250, 250, 0, 100);

  context.forEach((local) => {
    const { points } = local.next(time);

    canvas.noFill();
    // canvas.stroke(pick(mapping, time));
    canvas.strokeWeight(1);

    // canvas.beginShape();
    // points.forEach(p => {
    //   canvas.vertex(...p);
    // });
    // canvas.endShape();

    points.forEach((p) => {
      canvas.stroke(hue(time), saturation(time), 77, 0.4);
      canvas.ellipse(...p, width(time));
    });
  });

  canvas.rotate(PI / -144);
};

export default preset;
