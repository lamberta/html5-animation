
/**
 * @constructor
 */
function MotionPath () {
  this.paths = [];
  this.start = 0;
  this.end = NaN;
  this.strength = 0;
}

/**
 * Adds a path to the current motion path.
 * @param {LinearPath|QuadraticPath|BezierPath} path
 * @return {MotionPath}     The current motion path instance.
 */
MotionPath.prototype.addPath = function (path) {
  this.paths.push(path);
  this.end = path.end;
  this.strength += path.strength;
  return this;
};

/**
 * @param {number} t  The fraction of the overall duration of the path. (A value from 0.0 to 1.0)
 * @return {number}
 */
MotionPath.prototype.interpolate = function (t) {
  if (this.paths.length === 1) {
    return this.paths[0].interpolate(this.start, t);
    
  } else {
    var ratio = t * this.strength,
        lastEnd = this.start;
    
    for (var i = 0, len = this.paths.length, path; i < len; i++) {
      path = this.paths[i];
      if (ratio > path.strength) {
        ratio -= path.strength;
        lastEnd = path.end;
      } else {
        return path.interpolate(lastEnd, ratio / path.strength);
      }
    }
  }
  return 0;                      
};

/**
 * Adds a line to the current motion path.
 * @param {number} end      The position of the end point for the line.
 * @param {number} strength The degree of emphasis that should be placed on this segment. (Default is 1)
 * @return {MotionPath}     The current motion path instance.
 */
MotionPath.prototype.lineTo = function (end, strength) {
  return this.addPath(new LinearPath(end, strength));
};

/**
 * Adds a quadratic curve to the current motion path. 
 * @param {number} control  The position of the control point for the curve, which affects its angle and midpoint.
 * @param {number} end      The position of the end point for the curve.
 * @param {number} strength The degree of emphasis that should be placed on this segment. (Default is 1)
 * @return {MotionPath}     The current motion path instance.
 */
MotionPath.prototype.quadraticCurveTo = function (control, end, strength) {
  return this.addPath(new QuadraticPath(control, end, strength));
};

/**
 * Adds a bezier curve to the current motion path. 
 * @param {number} control1 The position of the control point for the curve, which affects its angle and midpoint.
 * @param {number} control2 The position of the control point for the curve, which affects its angle and midpoint.
 * @param {number} end      The position of the end point for the curve.
 * @param {number} strength The degree of emphasis that should be placed on this segment. (Default is 1)
 * @return {MotionPath}     The current motion path instance.
 */
MotionPath.prototype.bezierCurveTo = function (control1, control2, end, strength) {
  return this.addPath(new BezierPath(control1, control2, end, strength));
};

/**
 * Adds a line to the current motion path that returns to its start.
 * @return {MotionPath}     The current motion path instance.
 */
MotionPath.prototype.closePath = function () {
  return this.lineTo(this.start);
};

/*
 * Path Types
 */

function LinearPath (end, strength) {
  this.control = 0;
  this.end = end;
  this.strength = (typeof strength === 'undefined') ? 1 : strength;
}

LinearPath.prototype.interpolate = function (start, t) {
  return start + t * (this.end - start);
};

function QuadraticPath (control, end, strength) {
  this.control = control;
  this.end = end;
  this.strength = (typeof strength === 'undefined') ? 1 : strength;
}

QuadraticPath.prototype.interpolate = function (start, t) {
  return (1 - t) * (1 - t) * start + 2 * (1 - t) * t * this.control + t * t * this.end;
};

function BezierPath (control1, control2, end, strength) {
  this.control1 = control1;
  this.control2 = control2;
  this.end = end;
  this.strength = (typeof strength === 'undefined') ? 1 : strength;
}

BezierPath.prototype.interpolate = function (start, t) {
  return Math.pow(1 - t, 3) * start + 3 * Math.pow(1 - t, 2) * t * this.control1 + 3 * Math.pow(1 - t, 1) * Math.pow(t, 2) * this.control2 + Math.pow(t, 3) * this.end;
};
