easing.expo = {
  /**
   * Easing equation function for an exponential (2^t)
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d) {
    return (t === 0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },

  /**
   * Easing equation function for an exponential (2^t)
   * easing out: decelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d) {
    return (t === d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },

  /**
   * Easing equation function for an exponential (2^t)
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d) {
    if (t === 0) { return b; }
    if (t === d) { return b + c; }
    
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    } else {
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },

  /**
   * Easing equation function for an exponential (2^t)
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOutIn: function (t, b, c, d) {
    if (t < d/2) {
      return easing.expo.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.expo.easeIn((t * 2) - d, b + c/2, c/2, d);
    }
  }
};
