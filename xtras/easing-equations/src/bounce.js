easing.bounce = {
  /**
   * Easing equation function for a bounce (exponentially decaying parabolic bounce)
   * easing out: decelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
      
    } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
      
    } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
      
    } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    }
  },

  /**
   * Easing equation function for a bounce (exponentially decaying parabolic bounce)
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d) {
    return c - easing.bounce.easeOut(d - t, 0, c, d) + b;
  },

  /**
   * Easing equation function for a bounce (exponentially decaying parabolic bounce)
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d) {
    if (t < d / 2) {
      return easing.bounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
      
    } else {
      return easing.bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
  },

  /**
   * Easing equation function for a bounce (exponentially decaying parabolic bounce)
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOutIn: function (t, b, c, d) {
    if (t < d/2) {
      return easing.bounce.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.bounce.easeIn((t * 2) - d, b + c/2, c/2, d);
    }
  }
};
