function responsiveScreen(
  windowWidth,
  windowHeight,
  maxWidth = 1080,
  maxHeight = 1080,
  useMax = false,
  fullScreen = false
) {
  if (fullScreen) {
    return [windowWidth, windowHeight];
  }

  if (useMax) {
    return [maxWidth, maxHeight];
  }

  return [
    windowWidth > maxWidth ? maxWidth : windowWidth,
    windowHeight > maxHeight ? maxHeight : windowHeight,
  ];
}

export { responsiveScreen };
