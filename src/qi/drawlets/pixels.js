import { once } from "lodash";
import { drawable } from "../flow";

const pixels = () => {
  let ui;

  const setup = (props) => {
    const { ctx } = props;

    ui = ctx;
  };

  //
  // The Test:
  //
  // 1. Draw a white point on a black canvas.
  // 2. Check where is the position of the first 0 inside the array
  // 3. Colors are R,G,B,A, dividing by 4 I get the number of colors used to draw 1 pixel.
  // Note: the ratio should be power of 2, in other case it's not considered optimal.
  //
  const draw = () => {
    ui.background(0);

    ui.stroke("white");
    ui.fill("white");
    ui.strokeWeight(1);

    ui.point(0, 0);

    // 1. `ui.pixels` is available after this call
    // 2. keep in mind this could create a performance bottleneck
    ui.loadPixels();

    // const density = ui.pixelDensity();
    const i = ui.pixels.indexOf(0);
    // const zoomLevel = i / 4;
    const isRatioOptimal = zoomLevel % 2 === 0;

    const zoomLevel = 1;
    const density = 2;

    console.log("black pixel position:", i);
    console.log("zoom:", zoomLevel);
    console.log("density:", density);

    return {
      pixels: [zoomLevel, density, isRatioOptimal],
    };
  };

  // `once` stores the first return value and keep returning it from now on
  // this mechanism is a good candidate to replace setup phase.
  return drawable(setup, once(draw));
};

export { pixels };
