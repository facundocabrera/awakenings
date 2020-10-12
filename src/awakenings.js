require("p5");
require("p5/lib/addons/p5.sound");

import { SpiralV1 } from "./engine/spiral";
import { SoundV1 } from "./engine/sound";
import { PlotterV1 } from "./engine/plotter";
import { XY } from "./engine/xy";
import { XY2 } from "./engine/xy2";
import { XY3 } from "./engine/xy3";

import map from "lodash/map";
import filter from "lodash/filter";
import groupBy from "lodash/groupBy";
import pick from "lodash/pick";
import assign from "lodash/assign";

const Painters = {
  SpiralV1,
  SoundV1,
  PlotterV1,
  XY,
  XY2,
  XY3,
};

import { responsiveScreen } from "./utils/responsive-screen";

import presets from "./presets/2020-10-08.the.information.is.coming";

const properties = [
  "scale",
  "time",
  "frameRate",
  "background",
  "fullScreen",
  "center",
  "axis",
  "before", // @deprecated?
  "draw",
  "setup",
];

const sketch = (ctx) => {
  let canvasWidth, canvasHeight, mainCanvas;

  const painters = map(
    groupBy(
      filter(presets, (preset) => preset.disabled == null),
      "painter"
    ),
    (config, key) => Painters[key](assign(config, pick(presets, properties)))
  );

  function setup() {
    [canvasWidth, canvasHeight] = responsiveScreen(
      ctx.windowWidth,
      ctx.windowHeight,
      undefined,
      undefined,
      true,
      !!presets.fullScreen
    );

    mainCanvas = ctx.createCanvas(canvasWidth, canvasHeight);

    ctx.background(presets.background || 0);
    ctx.frameRate(presets.frameRate || 30);

    // @see Los engine implementan esta interface
    painters.forEach((p) =>
      p.setup({
        ctx,
        canvasWidth,
        canvasHeight,
      })
    );
  }

  function draw() {
    // @see Los engine implementan esta interface
    painters.forEach((p) => ctx.image(p.draw(), 0, 0));
  }

  // Hook functions into p5 sketch configuration context
  ctx.setup = setup;
  ctx.draw = draw;
};

const runtime = new p5(sketch);

onmousedown = () => runtime.userStartAudio();

onkeypress = ({ key }) => {
  switch (key) {
    case "s":
      runtime.noLoop();
      break;
    case "d":
      runtime.loop();
      break;
    default: {
      const now = new Date().toISOString();
      const name = "out" + now;

      runtime.saveCanvas(runtime.canvas, name, "png");
    }
  }
};

// 👁 Make UI reactive
const htmlStatus = runtime.select("#status");
const htmlPlay = runtime.select("#play");

htmlStatus.html(runtime.isLooping() ? "running" : "stopped");

htmlPlay.mouseClicked(() => {
  runtime[runtime.isLooping() ? "noLoop" : "loop"]();
  htmlStatus.html(runtime.isLooping() ? "running" : "stopped");
});
