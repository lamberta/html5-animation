var easing = {};
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
easing.quad = {
  /**
   * Easing equation function for a quadratic (t^2)
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b;
  },

  /**
   * Easing equation function for a quadratic (t^2)
   * easing out: decelerating to zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },

  /**
   * Easing equation function for a quadratic (t^2)
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c/2 * t * t + b;
    } else {
      return -c/2 * ((--t) * (t - 2) - 1) + b;
    }
  },

  /**
   * Easing equation function for a quadratic (t^2)
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOutIn: function (t, b, c, d) {
    if (t < d/2) {
      return easing.quad.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.quad.easeIn((t * 2) - d, b + c/2, c/2, d);
    }
  }
};
easing.quart = {
  /**
   * Easing equation function for a quartic (t^4)
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },

  /**
   * Easing equation function for a quartic (t^4)
   * easing out: decelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d) {
    return -c * ((t = t/d - 1) * t * t * t - 1) + b;
  },

  /**
   * Easing equation function for a quartic (t^4)
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c/2 * t * t * t * t + b;
    } else {
      return -c/2 * ((t -= 2) * t * t * t - 2) + b;
    }
  },

  /**
   * Easing equation function for a quartic (t^4)
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOutIn: function (t, b, c, d) {
    if (t < d/2) {
      return easing.quart.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.quart.easeIn((t*2) - d, b + c/2, c/2, d);
    }
  }
};
easing.quint = {
  /**
   * Easing equation function for a quintic (t^5)
   * easing in: accelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },

  /**
   * Easing equation function for a quintic (t^5)
   * easing out: decelerating from zero velocity.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOut: function (t, b, c, d) {
    return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
  },

  /**
   * Easing equation function for a quintic (t^5)
   * easing in/out: acceleration until halfway, then deceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeInOut: function (t, b, c, d) {
    if ((t /= d/2) < 1) {
      return c/2 * t * t * t * t * t + b;
    } else {
      return c/2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
  },

  /**
   * Easing equation function for a quintic (t^5)
   * easing out/in: deceleration until halfway, then acceleration.
   * @param {number} t  Current time (in frames or seconds).
   * @param {number} b  Starting value.
   * @param {number} c  Change needed in value.
   * @param {number} d  Expected easing duration (in frames or seconds).
   * @return {number}   The correct value.
   */
  easeOutIn: function (t, b, c, d) {
    if (t < d/2) {
      return easing.quint.easeOut(t * 2, b, c/2, d);
    } else {
      return easing.quint.easeIn((t * 2) - d, b + c/2, c/2, d);
    }
  }
};
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
