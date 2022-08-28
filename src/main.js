import { events } from "./qi/events";
import { pointer } from "./qi/pointer";

// import { sketch } from "./qi-gallery/2021-03-12-fft";
// import { sketch } from "./qi-gallery/2022-08-23-rebuilding";
// import { sketch } from "./qi-gallery/2022-08-24-rotate";
import { sketch } from "./qi-gallery/2022-08-26-electricity";

const runtime = new p5(sketch);

events(runtime);
pointer(runtime);
