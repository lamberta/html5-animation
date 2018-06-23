/**
 * Normalize the browser animation API across implementations. This requests
 * the browser to schedule a repaint of the window for the next animation frame.
 * Checks for cross-browser support, and, failing to find it, falls back to setTimeout.
 * @param {function}    callback  Function to call when it's time to update your animation for the next repaint.
 * @param {HTMLElement} element   Optional parameter specifying the element that visually bounds the entire animation.
 * @return {number} Animation frame request.
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.msRequestAnimationFrame ||
                                    window.oRequestAnimationFrame ||
                                    function (callback) {
                                      return window.setTimeout(callback, 17 /*~ 1000/60*/);
                                    });
  }
  
/**
 * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame' to reflect an update to the W3C Animation-Timing Spec.
 *
 * Cancels an animation frame request.
 * Checks for cross-browser support, falls back to clearTimeout.
 * @param {number}  Animation frame request.
 */
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                window.clearTimeout);
}

/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
export function captureMouse (element) {
  let mouse = {x: 0, y: 0, event: null}
  const {
    scrollLeft: body_scrollLeft,
    scrollTop: body_scrollTop
  } = document.body
  const {
    scrollLeft: element_scrollLeft,
    scrollTop: element_scrollTop
  } = document.documentElement
  const {offsetLeft, offsetTop} = element

  element.addEventListener('mousemove', event => {
    let x, y
    
    if (event.pageX || event.pageY) {
      x = event.pageX
      y = event.pageY
    } else {
      x = event.clientX + body_scrollLeft + element_scrollLeft
      y = event.clientY + body_scrollTop + element_scrollTop
    }

    x -= offsetLeft
    y -= offsetTop

    mouse.x = x
    mouse.y = y
    mouse.event = event
  }, false)

  return mouse
}

/**
 * Keeps track of the current (first) touch position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, isPressed, event
 */
export function captureTouch (element) {
  let touch = {x: null, y: null, isPressed: false, event: null}
  const {
    scrollLeft: body_scrollLeft,
    scrollTop: body_scrollTop
  } = document.body
  const {
    scrollLeft: element_scrollLeft,
    scrollTop: element_scrollTop
  } = document.documentElement
  const {offsetLeft, offsetTop} = element

  element.addEventListener('touchstart', event => {
    touch.isPressed = true;
    touch.event = event;
  }, false);

  element.addEventListener('touchend', event => {
    touch.isPressed = false;
    touch.x = null;
    touch.y = null;
    touch.event = event;
  }, false);
  
  element.addEventListener('touchmove', event => {
    let x, y,
        touch_event = event.touches[0]; //first touch
    
    if (touch_event.pageX || touch_event.pageY) {
      x = touch_event.pageX;
      y = touch_event.pageY;
    } else {
      x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
      y = touch_event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    touch.x = x;
    touch.y = y;
    touch.event = event;
  }, false);
  
  return touch;
};

/**
 * Returns a color in the format: '#RRGGBB', or as a hex number if specified.
 * @param {number|string} color
 * @param {boolean=}      toNumber=false  Return color as a hex number.
 * @return {string|number}
 */
export function parseColor (color, toNumber = false) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};

/**
 * Determine if a rectangle contains the coordinates (x,y) within it's boundaries.
 * @param {object}  rect  Object with properties: x, y, width, height.
 * @param {object}  point  Object with properties: x, y.
 * @return {boolean}
 */
export function rectContainsPoint(rect, point) {
  return !(point.x < rect.x ||
           point.x > rect.x + rect.width ||
           point.y < rect.y ||
           point.y > rect.y + rect.height);
}

/**
 * 检测某个点跟某个圆是否接触
 * @param {Object} circle 圆 {radius, x, y}
 * @param {Object} point 点 {x, y}
 * @return {Boolean} true 接触  false 没接触
 */
export function circleContainsPoint(circle, point) {
  const dx = point.x - circle.x,
    dy = point.y - circle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= circle.radius
}

/**
 * 检测两个圆是否相交
 * @param {Object} circleA 有x,y,radius的对象
 * @param {Object} circleB 有x,y,radius的对象
 * @returns {Boolean}
 */
export function interCircles(circleA, circleB) {
  const dx = circleA.x - circleB.x,
    dy = circleA.y - circleB.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < (circleA.radius + circleB.radius)
}

/**
 * Determine if two rectangles overlap.
 * @param {object}  rectA Object with properties: x, y, width, height.
 * @param {object}  rectB Object with properties: x, y, width, height.
 * @return {boolean}
 */
export function intersects(rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
           rectB.x + rectB.width < rectA.x ||
           rectA.y + rectA.height < rectB.y ||
           rectB.y + rectB.height < rectA.y);
};
