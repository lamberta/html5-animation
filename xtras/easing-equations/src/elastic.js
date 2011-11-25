easing.elastic = {
  /**
   * Easing equation function for an elastic (exponentially decaying sine wave)
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @param {number} a  Amplitude.
   * @param {number} p  Period.
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d, a, p) {
    var s;
    if (t === 0) { return b; }
    if ((t /= d) === 1) { return b + c; }
    if (!p) { p = d * 0.3; }
    
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p/4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) *
             Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },

  /**
   * Easing equation function for an elastic (exponentially decaying sine wave)
   * easing out: decelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @param {number} a  Amplitude.
   * @param {number} p  Period.
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d, a, p) {
    var s;
    if (t === 0) { return b; }
    if ((t /= d) === 1) { return b+c; }
    if (!p) { p = d * 0.3; }
    
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p/4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return (a * Math.pow(2, -10 * t) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
  },

  /**
   * Easing equation function for an elastic (exponentially decaying sine wave)
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @param {number} a  Amplitude.
   * @param {number} p  Period.
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d, a, p) {
    var s;
    if (t === 0) { return b; }
    if ((t /= d/2) === 2) { return b + c; }
    if (!p) { p = d * (0.3 * 1.5); }
    
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p/4;
    } else {
      s = p / (2 * Math.PI) * Math.asin (c/a);
    }
    if (t < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                     Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    } else {
      return a * Math.pow(2, -10 * (t -= 1)) *
        Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }
  },

  /**
   * Easing equation function for an elastic (exponentially decaying sine wave)
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @param {number} a  Amplitude.
   * @param {number} p  Period.
   * @return {number}   The correct value.
   */
  easeOutIn: function (t, b, c, d) {
    if (t < d/2) {
      return easing.elastic.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.elastic.easeIn((t * 2) - d, b + c/2, c/2, d);
    }
  }
};
