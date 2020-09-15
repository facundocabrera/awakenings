require("p5");
require("p5/lib/addons/p5.sound");

import { SpiralV1 } from "./engine/spiral";
import { SoundV1 } from "./engine/sound";
import { PlotterV1 } from "./engine/plotter";
import { XY } from "./engine/xy";

import map from "lodash/map";
import filter from "lodash/filter";
import groupBy from "lodash/groupBy";

const Painters = {
  SpiralV1,
  SoundV1,
  PlotterV1,
  XY
};

import { responsiveScreen } from "./utils/responsive-screen";

// 👁👁 PRESETS HERE!
// import presets from "./presets/2020-09-05.lets-ln-spirals";
// import presets from './presets/2020-09-06.lets-ln-spirals';
// import presets from './presets/2020-09-06.archimedean';
// import presets from './presets/2020-09-07.circles';
// import presets from './presets/2020-09-08.grounded';
// import presets from './presets/2020-09-09.xy';
import presets from './presets/2020-09-11.sound';

const sketch = (ctx) => {
  let canvasWidth;
  let canvasHeight;
  let mainCanvas;

  const painters = map(
    groupBy(
      filter(presets, (preset) => preset.disabled == null), 
      "painter"
    ),
    (config, key) => Painters[key](config)
  );

  function setup() {
    [canvasWidth, canvasHeight] = responsiveScreen(
      ctx.windowWidth,
      ctx.windowHeight,
      undefined,
      undefined,
      true,
      false
    );

    mainCanvas = ctx.createCanvas(canvasWidth, canvasHeight);

    ctx.background(0);
    ctx.frameRate(60);

    painters.forEach((p) =>
      p.setup({
        ctx,
        canvasWidth,
        canvasHeight,
      })
    );
  }

  function draw() {
    painters.forEach((p) => ctx.image(p.draw(), 0, 0));
  }

  // Hook functions into p5 sketch configuration context
  ctx.setup = setup;
  ctx.draw = draw;
};

const runtime = new p5(sketch);

onmousedown = () => runtime.userStartAudio();

onkeypress = () => {
  const now = new Date().toISOString();
  const name = "out" + now;

  runtime.saveCanvas(runtime.canvas, name, "png");
  // downloadFile(new Blob([snapshot(layers)], {type : 'application/json'}), name, 'json');
};
