import { events } from "./qi/events";

import sketch from "./presets/2020-12-25";

const runtime = new p5(sketch);

events(runtime);
