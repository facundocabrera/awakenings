import { Particle } from "./particle";

const PSystem = function ([x, y]) {
  this.origin = [x, y];
  this.particles = [];
  this.fields = [];
};

PSystem.prototype.addElement = function (els) {
  this.particles.push(...els.map((point) => new Particle(point)));
};

PSystem.prototype.addField = function (field) {
  this.fields.push(field);
};

PSystem.prototype.applyFields = function () {
  this.fields.forEach((field) => {
    field(this.particles);
  });
};

PSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    const p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

PSystem.prototype.tick = function () {
  this.applyFields();
  this.run();
};

export { PSystem };
