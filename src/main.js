import { events } from "./qi/events";
import { pointer } from "./qi/pointer";

// import { sketch } from "./qi-gallery/2021-03-12-fft";
// import { sketch } from "./qi-gallery/2022-08-23-rebuilding";
// import { sketch } from "./qi-gallery/2022-08-24-rotate";
// import { sketch } from "./qi-gallery/2022-08-26-electricity";
// import { sketch } from "./qi-gallery/2022-08-28-chroma-colors";
import { sketch } from "./qi-gallery/2022-08-28-chroma2";

const runtime = new p5(sketch);

events(runtime);
pointer(runtime);
