import { events } from "./qi/events";
import { sketch } from "./qi-gallery/2021-01-30-multi-render";

const runtime = new p5(sketch);

events(runtime);
