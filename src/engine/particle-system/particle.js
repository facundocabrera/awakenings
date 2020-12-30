const Particle = function ([x, y]) {
  this.position = [x, y];
  this.lifespan = 255;
};

Particle.prototype.run = function () {
  // this.lifespan--;
};

Particle.prototype.isDead = function () {
  // return this.lifespan === 0;
  return false;
};

export { Particle };
