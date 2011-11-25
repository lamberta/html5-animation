easing.sine = {
  /**
   * Easing equation function for a sinusoidal (sin(t))
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },

  /**
   * Easing equation function for a sinusoidal (sin(t))
   * easing out: decelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },

  /**
   * Easing equation function for a sinusoidal (sin(t))
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI * t/d) - 1) + b;
  },

  /**
   * Easing equation function for a sinusoidal (sin(t))
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOutIn: function (t, b, c, d) {
    if (t < d/2) {
      return easing.sine.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.sine.easeIn((t * 2) - d, b + c/2, c/2, d);
    }
  }
};
