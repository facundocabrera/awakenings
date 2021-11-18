import { events } from "./qi/events";
import { pointer } from "./qi/pointer";

import { sketch } from "./qi-gallery/2021-11-18-bezier";

const runtime = new p5(sketch);

events(runtime);
pointer(runtime);
