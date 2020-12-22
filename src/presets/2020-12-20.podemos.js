import { defaults } from "./defaults";

import { pick } from "../utils/array";

import { stops as circularStops } from "../geometry/circle";
import { stops as ellipticalStops } from "../geometry/ellipse";

import { omnitrix, omniBuilder } from "../geometry/omnitrix";

import { multiByScalar } from "../geometry/scale";

const { PI, sin, cos, pow, sqrt } = Math;

const mapping = [
  "#80FB2B77",
  "#CCE32777",
  "#FAE83777",
  "#E3B72777",
  "#FFB02977",
];

const input = omniBuilder(
  [circularStops(5), circularStops(7), circularStops(11), circularStops(13)]
);

const width = (time) => 500 * pow(-1, time) * sin((PI * time) / 144);

const next = (time) => {
  const points = multiByScalar(input, width(time));

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

let colorSlider;
preset.setup = (canvas, global) => {
  colorSlider = global.createSlider(0, 100, 77);
  colorSlider.position(10, 10);
  colorSlider.style("width", "80px");
};

preset.draw = (context, time, canvas, global) => {
  canvas.clear();
  canvas.noStroke();
  canvas.colorMode(global.HSB, 360, 100, 100, 1);

  const hue = (v) => sqrt(v) % 360;
  const saturation = (v) => sqrt(v) % 100;

  context.forEach((local) => {
    const { points } = local.next(time);

    canvas.noFill();
    // canvas.stroke(pick(mapping, time));
    canvas.strokeWeight(1);

    canvas.stroke(hue(time), saturation(time), colorSlider.value(), 0.7);
    canvas.beginShape();
    points.forEach((p) => {
      canvas.curveVertex(...p);
    });
    canvas.endShape();

    // points.forEach(p => {
    //   canvas.stroke(hue(time), saturation(time), 77, .4);
    //   canvas.ellipse(...p, width(time));
    // });
  });

  // canvas.rotate(PI / -144);
};

export default preset;
