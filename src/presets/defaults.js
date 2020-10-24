/**
 * @param {Array} preset 
 */
function defaults(preset) {
  preset.canvasSize = [1080, 1080];
  preset.fullScreen = false;
  
  preset.frameRate = 60;
  preset.background = "#000";
  preset.time = 1;
  
  // Axis coordinates
  preset.axis = false;
  preset.center = (width, height) => {
    return [width / 2, height / 2];
  };
  
  preset.setup = (canvas, global) => {};  
  preset.draw = (evaluations, canvas, global) => {};

  return preset;
};

export {
  defaults
};
