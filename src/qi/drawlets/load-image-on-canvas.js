import { loadImage } from "./load-image";

// QI WORKFLOW
import { compose, drawable } from "../flow";

const loadImageOnCanvasAlone = ({ path }) => {
  let ui, cw;
  let loaded = false;

  const setup = (props) => {
    const {
      ctx,
      dimensions: {
        to: [width, height],
        center,
      },
    } = props;

    ui = ctx;
    cw = width;
  };

  const draw = ({ loadImage }) => {
    const currentProps = loadImage[path];
    const { img, isReady } = loadImage[path];

    if (!loaded && isReady()) {
      // rescale image to fit the canvas area, increase the canvas size for more detail.
      ui.image(img, 0, 0, cw, (img.height * cw) / img.width);
      loaded = true;
    }

    return {
      loadImage: {
        ...loadImage,
        [path]: {
          ...currentProps,
          loadedOnCanvas: loaded,
        },
      },
    };
  };

  return drawable(setup, draw);
};

const loadImageOnCanvas = (props) =>
  compose([loadImage(props), loadImageOnCanvasAlone(props)]);

export { loadImageOnCanvasAlone, loadImageOnCanvas };
