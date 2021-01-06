function defaults(preset) {
  preset.canvasSize = [1080, 1080];
  preset.fullScreen = false;

  preset.frameRate = 15;
  preset.background = "#000";
  preset.time = 1;

  preset.axis = false;
  preset.center = (width, height) => {
    return [width / 2, height / 2];
  };

  // tengo que ver como armo la propagación aún
  preset.setup = (...args) => this.forEach(p => p.setup(...args));
  preset.draw = (...args) => this.forEach(p => p.draw(...args));

  return preset;
}

export { defaults };
