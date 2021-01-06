import { Environment } from "../qi/sketch";
import { XY } from "../qi/xy";
import { Painter } from "../qi/factories";

import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";

import { PSystem } from "../engine/particle-system/system";
import { Spin, RelativeSpin } from "../engine/particle-system/spin";

const origin = [0, 0];
const world = new PSystem(origin);

world.addElement(multiByScalar(stops(2000), 33));

const fields = [
  // [ [0, 100] , 50, 4 ],
  [ [0, -100], 144, 4 ],
  [ [100, 0] , 144, 4 ],
  [ [-100, 0], 144, 4 ]
];

fields.forEach(args => world.addField(RelativeSpin(...args)));

const next = (time) => {
  world.tick(time);

  const points = world.particles;

  return {
    points,
  };
};

let hueSlider;
let saturationSlider;
let lightSlider;
let alphaSlider;

const preset = {
  frameRate: 30
};

preset.setup = (global) => {
  hueSlider = global.createSlider(0, 360, 50, 1);
  saturationSlider = global.createSlider(0, 100, 50, 1);
  lightSlider = global.createSlider(0, 100, 50, 1);
  alphaSlider = global.createSlider(0, 1, 0.7, 0.05);
};

preset.draw = (time, global) => {
  global.clear();

  global.noStroke();
  global.colorMode(global.HSB, 360, 100, 100, 1);

  global.noFill();
  global.stroke(100);

  fields.forEach(([ point, radius ]) => {
    global.ellipse(...point, radius);  
  });

  const { points } = next(time);

  global.strokeWeight(2);

  points.forEach(({ position, lifespan }) => {
    global.stroke(
      hueSlider.value(),
      saturationSlider.value(),
      lifespan,
      alphaSlider.value()
    );

    global.fill(
      hueSlider.value(),
      saturationSlider.value(),
      lifespan,
      alphaSlider.value()
    );

    global.ellipse(...position, 10);
  });
};

export default Environment(
  XY(
    Painter([ preset ])
  )
);
