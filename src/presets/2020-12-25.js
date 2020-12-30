import { defaults } from "./defaults";

import { stops } from "../geometry/circle";

import { PSystem } from "../engine/particle-system/system";

import { Spin, RelativeSpin } from "../engine/particle-system/spin";

import { multiByScalar } from "../geometry/scale";

const origin = [0, 0];
const world = new PSystem(origin);

world.addElement(multiByScalar(stops(144), 20));

world.addField(RelativeSpin([0, 0], 1000, 25));

world.addField(RelativeSpin([100, 0], 5, 6));
world.addField(RelativeSpin([-100, 0], 5, 6, -1));

world.addField(RelativeSpin([0, 100], 50, 6));
world.addField(RelativeSpin([0, -100], 50, 6, -1));

const next = (time) => {
  world.tick(time);

  const points = world.particles;

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

preset.canvasSize = [1080, 1080];
preset.background = "#000";
preset.frameRate = 15;

let hueSlider;
let saturationSlider;
let lightSlider;
let alphaSlider;

preset.setup = (canvas, global) => {
  hueSlider = global.createSlider(0, 360, 50, 1);
  saturationSlider = global.createSlider(0, 100, 50, 1);
  lightSlider = global.createSlider(0, 100, 50, 1);
  alphaSlider = global.createSlider(0, 1, 0.7, 0.05);
};

preset.draw = (context, time, canvas, global) => {
  global.clear();
  canvas.clear();
  canvas.noStroke();
  canvas.colorMode(global.HSB, 360, 100, 100, 1);

  canvas.noFill();
  canvas.stroke(100);

  canvas.ellipse(0, 0, 10);

  canvas.ellipse(100, 0, 10);
  canvas.ellipse(-100, 0, 10);

  canvas.ellipse(0, 100, 10);
  canvas.ellipse(0, -100, 10);

  context.forEach((local) => {
    const { points } = local.next(time);

    canvas.strokeWeight(2);

    points.forEach(({ position, lifespan }) => {
      canvas.stroke(
        hueSlider.value(),
        saturationSlider.value(),
        lifespan,
        alphaSlider.value()
      );

      // canvas.fill(
      //   hueSlider.value(),
      //   saturationSlider.value(),
      //   lifespan,
      //   alphaSlider.value()
      // );

      canvas.ellipse(...position, 10);
    });
  });

  // canvas.rotate( PI / 8  );
};

export default preset;
