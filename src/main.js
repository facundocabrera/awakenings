import { events } from "./qi/events";
import { sketch } from "./qi-gallery/2021-11-09-bezier";

const runtime = new p5(sketch);

events(runtime);
