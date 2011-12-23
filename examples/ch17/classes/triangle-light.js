function Triangle (a, b, c, color) {
  this.pointA = a;
  this.pointB = b;
  this.pointC = c;
  this.color = (color === undefined) ? "#ff0000" : utils.parseColor(color);
  this.lineWidth = 1;
  this.alpha = 1;
  this.light = null;
}

Triangle.prototype.draw = function (context) {
  if (this.isBackface()) {
    return;
  }
  context.save();
  context.lineWidth = this.lineWidth;
  context.fillStyle = context.strokeStyle = this.getAdjustedColor();
  context.beginPath();
  context.moveTo(this.pointA.getScreenX(), this.pointA.getScreenY());
  context.lineTo(this.pointB.getScreenX(), this.pointB.getScreenY());
  context.lineTo(this.pointC.getScreenX(), this.pointC.getScreenY());
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Triangle.prototype.getDepth = function () {
  return Math.min(this.pointA.z, this.pointB.z, this.pointC.z);
};

Triangle.prototype.isBackface = function () {
  var cax = this.pointC.getScreenX() - this.pointA.getScreenX(),
      cay = this.pointC.getScreenY() - this.pointA.getScreenY(),
      bcx = this.pointB.getScreenX() - this.pointC.getScreenX(),
      bcy = this.pointB.getScreenY() - this.pointC.getScreenY();
  return cax * bcy > cay * bcx;
};

Triangle.prototype.getAdjustedColor = function () {
  var color = utils.parseColor(this.color, true),
      red = color >> 16,
      green = color >> 8 & 0xff,
      blue = color & 0xff,
      lightFactor = this.getLightFactor();
  red *= lightFactor;
  green *= lightFactor;
  blue *= lightFactor;
  return utils.parseColor(red << 16 | green << 8 | blue);
};

Triangle.prototype.getLightFactor = function () {
  var ab = {
    x: this.pointA.x - this.pointB.x,
    y: this.pointA.y - this.pointB.y,
    z: this.pointA.z - this.pointB.z
  };
  var bc = {
    x: this.pointB.x - this.pointC.x,
    y: this.pointB.y - this.pointC.y,
    z: this.pointB.z - this.pointC.z
  };
  var norm = {
    x:  (ab.y * bc.z) - (ab.z * bc.y),
    y:-((ab.x * bc.z) - (ab.z * bc.x)),
    z:  (ab.x * bc.y) - (ab.y * bc.x)
  };
  var dotProd = norm.x * this.light.x +
                norm.y * this.light.y +
                norm.z * this.light.z,
      normMag = Math.sqrt(norm.x * norm.x +
                          norm.y * norm.y +
                          norm.z * norm.z),
      lightMag = Math.sqrt(this.light.x * this.light.x +
                           this.light.y * this.light.y +
                           this.light.z * this.light.z);
  
  return (Math.acos(dotProd / (normMag * lightMag)) / Math.PI) * this.light.brightness;
};
