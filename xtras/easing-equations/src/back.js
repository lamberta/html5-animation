easing.back = {
  /**
   * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2)
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @param {number} s  Overshoot ammount: higher s means greater overshoot
   *                      (0 produces cubic easing with no overshoot,
   *                      and the default value of 1.70158 produces an overshoot of 10 percent).
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d, s) {
    s = (s === undefined) ? 1.70158 : s;
    return c * (t /= d) * t * ((s+1) * t - s) + b;
  },

  /**
   * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2)
   * easing out: decelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @param {number} s  Overshoot ammount: higher s means greater overshoot
   *                      (0 produces cubic easing with no overshoot,
   *                      and the default value of 1.70158 produces an overshoot of 10 percent).
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d, s) {
    s = (s === undefined) ? 1.70158 : s;
    return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },

  /**
   * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2)
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @param {number} s  Overshoot ammount: higher s means greater overshoot
   *                      (0 produces cubic easing with no overshoot,
   *                      and the default value of 1.70158 produces an overshoot of 10 percent).
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d, s) {
    s = (s === undefined) ? 1.70158 : s;
    if ((t /= d/2) < 1) {
      return c/2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    } else {
      return c/2 * ((t -= 2) * t *(((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
  },

  /**
   * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2)
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @param {number} s  Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
   * @return {number}   The correct value.
   */
  easeOutIn: function(t, b, c, d) {
    if (t < d/2) {
      return easing.back.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.back.easeIn((t * 2) - d, b + c/2, c/2, d);
    }
  }
};
