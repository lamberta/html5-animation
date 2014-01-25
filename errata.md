# Errata Sheet

This is a list of updates, corrections, and typos for the
book version of [Foundation HTML5 Animation with JavaScript](http://lamberta.github.io/html5-animation/).
For the latest fixes to any of the book examples, please
double-check it against the source code contained within the
online [code repository](https://github.com/lamberta/html5-animation).

If you find any more problems, please drop
[me](https://github.com/lamberta) a message, or
[submit an issue](https://github.com/lamberta/html5-animation/issues).
Thanks for reading!

### p. v, vii, 69

Chapter 4 should be titled "Rendering Techniques".

### p. 30

Typo in last paragraph, the sentence should read: *There are
also event handlers added ...*

### p. 54, 55

In example `04-wave-1.html`, the `drawFrame` function should
look like:

~~~
ball.x += xspeed;
ball.y = centerY + Math.sin(angle) * range;
angle += yspeed;
ball.draw(context);
~~~

The division operation is extraneous to the equation
abstraction (submitted by Peter Stema), and the book omits
the line where the angle is incremented each frame
(submitted by Steve Paget).

### p. 60, p. 61

In examples `08-circle.html` and `09-oval.html`, to match
the text above, the sine and cosine functions should be
reversed when calculating the ball's position. (Submitted by
Gerald Cullen)

~~~
ball.x = centerX + Math.cos(angle) * radius;
ball.y = centerY + Math.sin(angle) * radius;
~~~

### p. 67

Typo in the last sentence, it should read: *You should have
no trouble creating some beautiful pictures or animations
with trigonometry.*

### p. 82, p. 84

In examples `04-multi-curve-1.html` and
`05-multi-curve-2.html`, the code to move to the first point
should read: (Submitted by Gerald Cullen)

~~~
context.beginPath();
context.moveTo(points[0].x, points[0].y);
~~~

### p. 111

A production error caused an errant graphic to obscure
portions of the text. The complete paragraphs are as
follows:

... So, given the 45 degrees and the hypotenuse of 1 pixel, you
should be able to use `Math.cos` and `Math.sin` to find the
lengths of `vx` and `vy`.

The side adjacent to the angle is `vx`. The cosine of an angle
is the adjacent/hypotenuse. Or, stated another way, the
adjacent side is the cosine of the angle times the
hypotenuse. Similarly, the opposite side is `vy`. Sine is
opposite/hypotenuse, or the opposite is the sine times
hypotenuse.

Here’s the formula you would use:

~~~
vx = Math.cos(angle) * speed;
vy = Math.sin(angle) * speed;
~~~

Now don’t you dare forget to convert the 45 degrees to
radians before passing it into the Math functions! This is
what the code looks like after we plug in example values: ...

### p. 148

In the paragraph following the example, the third sentence
should read: If `speed` is *greater* than `friction`,
subtract; otherwise, `speed` equals zero. (Submitted by
Gerald Cullen)

### p. 176

In an updated Editor's Draft of the [W3C Animation-Timing](http://www.w3.org/TR/animation-timing/)
specification, `window.cancelRequestAnimationFrame` has been renamed to `window.cancelAnimationFrame`. (Submitted by Paul Irish)

Exercise `03-easing-off.html` has been updated to use this name:

~~~
window.cancelAnimationFrame(animRequest);
~~~

### p. 177

The cross-browser test for the `cancelAnimationFrame`
function definition has been updated in `utils.js` to reflect its name change:

~~~
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                 window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                 window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                 window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                 window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                 window.clearTimeout);
}
~~~

### p. 198

In the `drawFrame` function, the following lines should be
highlighted since they are new for this example:

~~~
springTo(ball0, ball2);
...
springTo(ball1, ball2);
...
context.lineTo(ball0.x, ball0.y);
~~~

### p. 258

The last sentence in the first paragraph should read:
... the overall velocity to look *like* something Figure 11-7.

### p. 261

The beginning of the third paragraph should read: Because
you use `ball0` as ...

### p. 269

In the second bullet point, there is an extraneous full stop
after the word *versus*.

### p. 298

Typo in the last paragraph, the sentence should be: *Rename
the original slider ...*

### p. 462

Exercise `14-time-based-3.html` exhibits a bug when a user
switches to a new browser tab, then, after a few seconds,
switches back to the tab running the example. (Submitted by
Paul Irish)

The current frame uses the time stored by the previous frame
to calculate the elapsed time. Since switching browser tabs
increases this value by many times, the calculation for
vertical velocity results in excessive motion. One fix is to
establish a range for the `elapsed` value before applying
the `gravity` multiplier. The typical framerate is about 17
milliseconds.

~~~
elapsed = Math.min(20, Math.max(-20, elapsed));
vy += gravity * elapsed / 1000;
~~~


## The Mystery of the Missing Minus Signs

Due to a printing error during production, there are a
number of missing minus signs within source code entries
throughout the book. If the code doesn't seem to run in your
browser, make sure to double-check it against the examples
in this online repository. I apologize for the frustrating
experience and want to thank everyone who has submitted (or
will submit!) errata to clean this up. Special thanks to
Gerald Cullen and Garrett Rodriguez for finding these little
buggers.

### p. 160

~~~
vx = Math.random() * 10 - 5,
~~~

### p. 163

In the `trackVelocity` function:

~~~
vx = ball.x - oldX;
vy = ball.y - oldY;
~~~

### p. 164

~~~
vx = Math.random() * 10 - 5,
~~~

### p. 230, 232

~~~
x2 = x1 * cos - y1 * sin,
~~~

### p. 236

~~~
//get position of ball, relative to line
var x1 = ball.x - line.x,
    y1 = ball.y - line.y,
    //rotate coordinates
    ...
    y2 = y1 * cos - x1 * sin,
~~~

### p. 241

~~~
if (ball.x + ball.radius > bounds.x && ball.x - ball.radius < bounds.x + bounds.width) {
  //all the rest of the code that was in this function
}
~~~

### p. 250

The formula should read:

~~~
          (m0 - m1) × v0 + 2 × m1 × v1
v0Final = ----------------------------
                 m0 + m1

          (m1 - m0) × v1 + 2 × m0 × v0
v1Final = ----------------------------
                 m0 + m1
~~~

### p. 252

In the code example:

~~~
var dist = ball1.x - ball0.x;
~~~

And the formula below should read:

~~~
          (m0 - m1) × v0 + 2 × m1 × v1
v0Final = ----------------------------
                 m0 + m1
~~~

### p. 253

The formula should read:

~~~
          (m1 - m0) × v1 + 2 × m0 × v0
v1Final = ----------------------------
                 m0 + m1
~~~

In the `drawFrame` function:

~~~
var dist = ball1.x - ball0.x;
~~~

### p. 255

~~~
var dist = ball1.x - ball0.x;
~~~

### p. 259, p. 265, p. 266

~~~
ball0.x = canvas.width - 200;
ball0.y = canvas.height - 200;
ball0.vx = Math.random() * 10 - 5;
ball0.vy = Math.random() * 10 - 5;
...
ball1.vx = Math.random() * 10 - 5;
ball1.vy = Math.random() * 10 - 5;
~~~

In the `checkWalls` function:

~~~
ball.x = canvas.width - ball.radius;
...
ball.y = canvas.height - ball.radius;
~~~

### p. 260, p. 261, p. 262, p. 263, p. 265

In the `checkCollision` function:

~~~
var dx = ball1.x - ball0.x,
    dy = ball1.y - ball0.y,
~~~

### p. 262

~~~
var vxTotal = ball0.vx - ball1.vx;
~~~

### p. 262, p. 264, p. 273

~~~
var vxTotal = vx0 - vx1;
~~~

### p. 268

~~~
ball.vx = Math.random() * 10 - 5;
ball.vy = Math.random() * 10 - 5;
~~~

### p. 278

In the `gravitate` function:

~~~
var dx = partB.x - partA.x,
    dy = partB.y - partA.y,
~~~

### p. 286, p. 288, p. 290

In the `spring` function:

~~~
var dx = partB.x - partA.x,
    dy = partB.y - partA.y,
~~~

### p. 288

~~~
particle.vx = Math.random() * 6 - 3;
particle.vy = Math.random() * 6 - 3;
~~~

### p. 296

In the `Slider.prototype.updateValue` function:

~~~
handleRange = this.height - this.handleHeight,
valueRange = this.max - this.min;
~~~

And in the `Slider.prototype.updatePosition` function:

~~~
var handleRange = this.height - this.handleHeight,
    valueRange = this.max - this.min;
~~~

### p. 297

In the `onMouseMove` function:

~~~
var pos_y = mouse.y - self.y;
    self.handleY = Math.min(self.height - self.handleHeight, Math.max(pos_y, 0));
~~~

### p. 312, p. 315

In the `walk` function:

~~~
segB.vx = segB.getPin().x - foot.x;
segB.vy = segB.getPin().y - foot.y;
~~~

### p. 312

In the `checkFloor` function:

~~~
var dy = yMax - canvas.height;
~~~
