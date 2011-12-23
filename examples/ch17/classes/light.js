function Light (x, y, z, brightness) {
  this.x = (x === undefined) ? -100 : x;
  this.y = (y === undefined) ? -100 : y;
  this.z = (z === undefined) ? -100 : z;
  this.brightness = (brightness === undefined) ? 1 : brightness;
}

Light.prototype.setBrightness = function (b) {
  this.brightness = Math.min(Math.max(b, 0), 1);
};
