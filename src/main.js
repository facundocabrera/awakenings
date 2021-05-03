import { events } from "./qi/events";
import { sketch } from "./qi-gallery/2021-04-28-cellular-binary";

const runtime = new p5(sketch);

events(runtime);
