import { events } from "./qi/events";
import { sketch } from "./presets/2021-01-07.qi-testing";

const runtime = new p5(sketch);

events(runtime);
