import { events } from "./qi/events";
// import { sketch } from "./presets/2021-01-07.qi-testing.2";

import { sketch } from "./qi-gallery/2020-08-26";

const runtime = new p5(sketch);

events(runtime);
