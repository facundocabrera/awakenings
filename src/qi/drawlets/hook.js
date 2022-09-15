import { drawable, compose } from "../flow";

/**
 *
 * @param {Array<Drawables>} drawables execution tree
 * @param {Object} settings object with canvas settings
 * @returns
 */
const hook =
  (
    drawables,
    { frameRate = 30, width = 1080, height = 1080, background = 0 }
  ) =>
  (p5js) => {
    const setup = () => {
      p5js.createCanvas(width, height);
      p5js.background(background);
      p5js.frameRate(frameRate);

      return {
        ctx: p5js,
        dimensions: {
          from: [0, 0],
          to: [width, height],
          center: [width / 2, height / 2],
        },
        configs: {
          frameRate,
          width,
          height,
          background,
        },
      };
    };

    const startUp = drawable(setup);
    const joint = compose([startUp, drawables]);

    // Hook functions into p5 sketch configuration context
    p5js.setup = joint.setup;
    p5js.draw = joint.draw;
  };

export { hook };
