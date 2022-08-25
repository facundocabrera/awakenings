import { events } from "./qi/events";
import { pointer } from "./qi/pointer";

import { sketch } from "./qi-gallery/2022-08-23-rebuilding";
// import { sketch } from "./qi-gallery/2022-08-24-rotate";

const runtime = new p5(sketch);

events(runtime);
pointer(runtime);
