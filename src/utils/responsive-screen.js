function responsiveScreen(windowWidth, windowHeight, maxWidth = 1080, maxHeight = 1080) {
  return [
    windowWidth > maxWidth ? maxWidth : windowWidth, 
    windowHeight > maxHeight ? maxHeight : windowHeight
  ];
}

export {
  responsiveScreen
};
