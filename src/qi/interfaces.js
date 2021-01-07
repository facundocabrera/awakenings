import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';

export const isDrawable = spec => {
  return isFunction(spec.setup) && isFunction(spec.draw);
};

export const checkDrawable = spec => {
  if (!isDrawable(spec)) throw 'Implement Drawable interface';
};

export const isCanvas = spec => {
  return isArray(spec.canvasSize) && isNumber(spec.frameRate) && isNumber(spec.time);
};

export const checkCanvas = spec => {
  if (!isCanvas(spec)) throw 'Implement Canvas interface';
};

export const Canvas = spec => {
  checkDrawable(spec);

  spec.canvasSize = [1080, 1080];

  spec.frameRate = 15;
  spec.background = "#000";
  spec.time = 1;

  checkCanvas(spec);

  return spec;
};

export const Painter = spec => {
  checkDrawable(spec);

  spec.center = (width, height) => {
    return [width / 2, height / 2];
  };

  spec.rotate = () => 0;

  return spec;
};

/**
 * Loop over an Array of Painter.
 * 
 * @param {Array<Painter>} painters pieces to be draw into the canvas.
 * 
 * @returns Array<Painter>
 */
export const ComposePainter = pieces => {
  if (!isArray(pieces)) throw 'pieces should be an Array';

  pieces.setup = (...args) => pieces.forEach(p => p.setup(...args));
  pieces.draw = (...args) => pieces.forEach(p => p.draw(...args));

  checkDrawable(pieces);

  return pieces;
};
