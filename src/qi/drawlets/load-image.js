import { once } from "lodash";

// QI WORKFLOW
import { drawable } from "../flow";

const loadImage = ({ path }) => {
  let ui;
  let imageReady = false;

  const setup = (props) => {
    const { ctx } = props;

    ui = ctx;
  };

  const draw = ({ loadImage }) => {
    // I could use just a plain Image instance to handle an img load, but once I try to feed
    // p5js canvas, there is an error because some of the properties are missing, so using
    // this call, the behind scene is the same, but with few more properties.
    const img = ui.createImg(path, '', '', () => (imageReady = true));
    
    // Give call appends the image to the dom, I need to hide it before it gets rendered.
    img.hide();

    return {
      loadImage: {
        ...(loadImage ?? {}),
        [path]: { img, isReady: () => imageReady },
      }
    };

    // This should be used to plot the image into the canvas.
    // ui.image(img, 0, 0);
  };

  // `once` is used because I want to generate the image only once
  return drawable(setup, once(draw));
};

export { loadImage };
