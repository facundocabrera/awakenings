function Painter(spec = []) {
  spec.canvasSize = [1080, 1080];

  spec.frameRate = 15;
  spec.background = "#000";
  spec.time = 1;

  spec.setup = (...args) => spec.forEach(painter => painter.setup(...args));
  spec.draw = (...args) => spec.forEach(painter => painter.draw(...args));

  // cual es el centro del canvas
  spec.center = (width, height) => {
    return [width / 2, height / 2];
  };

  // rotacion aplicada antes de hacer el render
  spec.rotate = () => 0;

  return spec;
}

function Unit(spec) {
  spec.canvasSize = [1080, 1080];

  spec.frameRate = 15;
  spec.background = "#000";
  spec.time = 1;

  // cual es el centro del canvas
  spec.center = (width, height) => {
    return [width / 2, height / 2];
  };

  // rotacion aplicada antes de hacer el render
  spec.rotate = () => 0;

  return spec;
}

export {
  Painter
};
