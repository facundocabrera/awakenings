function responsiveScreen(
  windowWidth,
  windowHeight,
  maxWidth = 1080,
  maxHeight = 1080,
  useMax = false
) {
  if (useMax) {
    return [maxWidth, maxHeight];
  }

  return [
    windowWidth > maxWidth ? maxWidth : windowWidth,
    windowHeight > maxHeight ? maxHeight : windowHeight,
  ];
}

export { responsiveScreen };
