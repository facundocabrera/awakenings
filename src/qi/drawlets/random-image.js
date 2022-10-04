import { once } from "lodash";

// QI WORKFLOW
import { drawable } from "../../qi/flow";

// QI TOOLS
import { position } from "../tools/images/pixel";

const randomImage = () => {
  let ui;
  let cw, ch;

  const setup = (props) => {
    const {
      ctx,
      dimensions: {
        to: [width, height],
      },
    } = props;

    ui = ctx;
    cw = width;
    ch = height;
  };

  // @depends on pixels drawlet to describe the screen
  const draw = ({ pixels: [zoom, density] }) => {
    const img = ui.createImage(cw * density * zoom, ch * density * zoom);
    
    img.loadPixels();

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const index = position([x, y], [img.width, 4]);

        const red = x % 256;
        const green = y % 256;
        const blue = (x * y) % 256;
        const alpha = 255;

        img.pixels[index] = red;
        img.pixels[index + 1] = green;
        img.pixels[index + 2] = blue;
        img.pixels[index + 3] = alpha;
      }
    }

    img.updatePixels();

    return {
      randomImage: img
    };
    
    // This should be used to plot the random image into the canvas.
    // ui.image(img, 0, 0);
  };

  // `once` is used because I want to generate the image only once
  return drawable(setup, once(draw));
};

export { randomImage };
