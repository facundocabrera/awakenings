import { events } from "./qi/events";
import { sketch } from "./qi-gallery/2021-02-03-fourier-experiment";

const runtime = new p5(sketch);

events(runtime);
