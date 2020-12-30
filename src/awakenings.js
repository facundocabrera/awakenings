import { SpiralV1 } from "./engine/spiral";
import { SoundV1 } from "./engine/sound";
import { PlotterV1 } from "./engine/plotter";
import { XY } from "./engine/xy";
import { XY2 } from "./engine/xy2";
import { XY3 } from "./engine/xy3";
import { XY4 } from "./engine/xy4";

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
  XY4,
};

import presets from "./presets/2020-12-25";

const properties = [
  "canvasSize",
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
  const painters = map(
    groupBy(
      filter(presets, (preset) => preset.disabled == null),
      "painter"
    ),
    (config, key) => Painters[key](assign(config, pick(presets, properties)))
  );

  function setup() {
    const [canvasWidth = 1080, canvasHeight = 1080] = presets.canvasSize;

    ctx.createCanvas(canvasWidth, canvasHeight);
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

onkeypress = ({ key }) => {
  switch (key) {
    case "a": {
      runtime.userStartAudio();
      break;
    }
    case "h": {
      const help = runtime.select("#help").elt;
      help.style.display = help.style.display === "" ? "block" : "";
      break;
    }
    case "s": {
      runtime[runtime.isLooping() ? "noLoop" : "loop"]();
      break;
    }
    case "r": {
      window.location.reload();
      break;
    }
    default: {
      const now = new Date().toISOString();
      const name = "out" + now;

      runtime.saveCanvas(runtime.canvas, name, "png");
    }
  }
};
