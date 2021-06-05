import { events } from "./qi/events";
import { sketch } from "./qi-gallery/2021-05-24-universality";

const runtime = new p5(sketch);

events(runtime);
