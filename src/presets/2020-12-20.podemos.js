import { defaults } from "./defaults";

import { stops as circularStops } from "../geometry/circle";

import { omniBuilder } from "../geometry/omnitrix";
import { multiByScalar } from "../geometry/scale";

const { PI, sin, cos, pow, sqrt, floor } = Math;

const input = omniBuilder(
  // [circularStops(3), circularStops(5)]
  [circularStops(3), circularStops(11), circularStops(7)]
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

  const hue = v => floor(sqrt(v)) % 360;
  const saturation = v => v % 100;

  context.forEach((local) => {
    const { points } = local.next(time);

    canvas.noFill();
    canvas.strokeWeight(1);

    canvas.stroke(hue(time), saturation(time), colorSlider.value(), 0.4);
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
