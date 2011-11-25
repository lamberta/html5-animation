This is a JavaScript implementation of the motion easing equations collected by [Robert Penner](http://robertpenner.com).

The following math-based motion API is provided, check the source files for the definitions of function parameters:

- Linear
  - `easing.linear.easeNone(t, b, c, d)`
  - `easing.linear.easeIn(t, b, c, d)`
  - `easing.linear.easeOut(t, b, c, d)`
  - `easing.linear.easeInOut(t, b, c, d)`
  - `easing.linear.easeOutIn(t, b, c, d)`
- Quadratic
  - `easing.quad.easeIn(t, b, c, d)`
  - `easing.quad.easeOut(t, b, c, d)`
  - `easing.quad.easeInOut(t, b, c, d)`
  - `easing.quad.easeOutIn(t, b, c, d)`
- Cubic
  - `easing.cubic.easeIn(t, b, c, d)`
  - `easing.cubic.easeOut(t, b, c, d)`
  - `easing.cubic.easeInOut(t, b, c, d)`
  - `easing.cubic.easeOutIn(t, b, c, d)`
- Quartic
  - `easing.quart.easeIn(t, b, c, d)`
  - `easing.quart.easeOut(t, b, c, d)`
  - `easing.quart.easeInOut(t, b, c, d)`
  - `easing.quart.easeOutIn(t, b, c, d)`
- Quintic
  - `easing.quint.easeIn(t, b, c, d)`
  - `easing.quint.easeOut(t, b, c, d)`
  - `easing.quint.easeInOut(t, b, c, d)`
  - `easing.quint.easeOutIn(t, b, c, d)`
- Sinusoidal
  - `easing.sine.easeIn(t, b, c, d)`
  - `easing.sine.easeOut(t, b, c, d)`
  - `easing.sine.easeInOut(t, b, c, d)`
  - `easing.sine.easeOutIn(t, b, c, d)`
- Exponential
  - `easing.expo.easeIn(t, b, c, d)`
  - `easing.expo.easeOut(t, b, c, d)`
  - `easing.expo.easeInOut(t, b, c, d)`
  - `easing.expo.easeOutIn(t, b, c, d)`
- Circular
  - `easing.circ.easeIn(t, b, c, d)`
  - `easing.circ.easeOut(t, b, c, d)`
  - `easing.circ.easeInOut(t, b, c, d)`
  - `easing.circ.easeOutIn(t, b, c, d)`
- Back
  - `easing.back.easeIn(t, b, c, d, s)`
  - `easing.back.easeOut(t, b, c, d, s)`
  - `easing.back.easeInOut(t, b, c, d, s)`
  - `easing.back.easeOutIn(t, b, c, d, s)`
- Bounce
  - `easing.bounce.easeIn(t, b, c, d)`
  - `easing.bounce.easeOut(t, b, c, d)`
  - `easing.bounce.easeInOut(t, b, c, d)`
  - `easing.bounce.easeOutIn(t, b, c, d)`
- Elastic
  - `easing.elastic.easeIn(t, b, c, d, a, p)`
  - `easing.elastic.easeOut(t, b, c, d, a, p)`
  - `easing.elastic.easeInOut(t, b, c, d, a, p)`
  - `easing.elastic.easeOutIn(t, b, c, d, a, p)`

Run `demo.html` in a HTML5 capable browser to see the movement characteristics provided by the functions.  
For a detailed treatment of the subject, see [Motion, Tweening, and Easing](http://robertpenner.com/easing/penner_chapter7_tweening.pdf).

To build: `bash$ NAME="easing.js"; echo "var easing = {};" > $NAME; for f in ./src/*; do cat "$f" >> $NAME; done`

Include the script in your document: `<script src="easing.js"><script>`. 
The functions are properties of the global variable `easing`.

For example, to ease a point's x coordinate from 0 to 100, linearly over 10 frames: 

    var pt = {x: 0, y: 0},
        start = 0,
        end = 100,
        duration = 10;

    for (var time = 0, change; time <= duration; time++) {
      change = end - start;
      pt.x = easing.linear.easeIn(time, start, change, duration);
      console.log(pt.x);
    }

This outputs to the console:

    0
    10
    20
    30
    40
    50
    60
    70
    80
    90
    100

Now try elastic easing:

    for (time = 0; time <= duration; time++) {
      change = end - start;
      pt.x = easing.elastic.easeOut(time, start, end, duration);
      console.log(pt.x);
    }

Output:

    0
    125
    112.5
    87.5
    103.125
    101.5625
    98.4375
    100.390625
    100.1953125
    99.8046875
    100
