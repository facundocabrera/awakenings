function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export { getRandomInt, random };
