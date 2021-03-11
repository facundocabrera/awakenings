import { events } from "./qi/events";
import { sketch } from "./qi-gallery/2021-03-11-fourier-centroid";

const runtime = new p5(sketch);

events(runtime);
