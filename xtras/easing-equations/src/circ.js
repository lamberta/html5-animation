easing.circ = {
  /**
   * Easing equation function for a circular (sqrt(1-t^2))
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },

  /**
   * Easing equation function for a circular (sqrt(1-t^2))
   * easing out: decelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d) {
    return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
  },

  /**
   * Easing equation function for a circular (sqrt(1-t^2))
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d) {
    if ((t /= d/2) < 1) {
      return -c/2 * (Math.sqrt(1 - t * t) - 1) + b;
    } else {
      return c/2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },

  /**
   * Easing equation function for a circular (sqrt(1-t^2))
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOutIn: function (t, b, c, d) {
    if (t < d/2) {
      return easing.circ.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.circ.easeIn((t * 2) - d, b + c/2, c/2, d);
    }
  }
};
