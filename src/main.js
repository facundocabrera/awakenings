import { events } from "./qi/events";
import { pointer } from "./qi/pointer";

import { sketch } from "./qi-gallery/2022-06-26-build-an-idea";

const runtime = new p5(sketch);

events(runtime);
pointer(runtime);
