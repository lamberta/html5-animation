easing.cubic = {
  /**
   * Easing equation function for a cubic (t^3)
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },

  /**
   * Easing equation function for a cubic (t^3)
   * easing out: decelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d) {
    return c * ((t = t/d - 1) * t * t + 1) + b;
  },

  /**
   * Easing equation function for a cubic (t^3)
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d) {
    if ((t /= d/2) < 1) {
      return c/2 * t * t * t + b;
    } else {
      return c/2 * ((t -= 2) * t * t + 2) + b;
    }
  },

  /**
   * Easing equation function for a cubic (t^3)
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOutIn: function (t, b, c, d) {
    if (t < d/2) {
      return easing.cubic.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.cubic.easeIn((t * 2) - d, b + c/2, c/2, d);
    }
  }
};
