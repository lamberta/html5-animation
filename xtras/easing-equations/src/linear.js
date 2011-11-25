easing.linear = {
  /**
   * Easing equation function for a simple linear tweening, with no easing.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeNone: function (t, b, c, d) {
    return c * t/d + b;
  }
};

easing.linear.easeIn = easing.linear.easeNone;
easing.linear.easeOut = easing.linear.easeNone;
easing.linear.easeInOut = easing.linear.easeNone;
easing.linear.easeOutIn = easing.linear.easeNone;
