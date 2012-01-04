# Putting Web Workers to Work

HTML5 supports [Web Workers](http://www.w3.org/TR/workers/),
which are execution processes that allow JavaScript code to run
independently of the main event loop. This means we can move
some of the more intensive calculations, that would
otherwise lock up the browser, into a separate
process—keeping the user interface responsive while
continuing to crunch numbers in the background. Check this
[compatibility table](http://caniuse.com/webworkers) to see
which browsers support web workers.

To create a new worker, in the main script, instantiate a
`Worker` object by passing the location of a JavaScript file to run:

    var worker = new Worker('./task.js');

Communication with a worker and the main script is done by
passing messages, which are just event handlers on a [Worker](https://developer.mozilla.org/En/DOM/Worker)
object. Data can be sent through the event's `data` property
and is passed to a worker as an argument to its `postMessage` method:

    worker.postMessage({message:"Message from main script!", x:1, y:2});

This sends a *copy* of the data and not a reference, which
is usually the case when passing objects to JavaScript
functions. This is because objects are serialized and
de-serialized when passed back and forth as
messages. And something else to keep in mind, since workers
are unable to access the DOM or the variable scope of the
main script, any initialization of a worker will have to be
done by passing a message to it.

To receive a message from the worker, add an event handler
for type `message`:

    worker.addEventListener('message', function (event) {
      console.log(event.data);
    }, false);

Sending and handling data from within a worker script is
done in the same manner as above, however, the event handler
and methods are on the `self` object—the global space of the worker:

    self.postMessage("Message from the worker!");
    
    self.addEventListener('message', function (event) {
      //redirect a message back to main, since a worker can't access console.log
      self.postMessage("Send back: " + event.data);
    }, false);

To immediately kill a web worker, call its `terminate` method:

    worker.terminate();

For further details on how to use web workers, see
[Using Web Workers](https://developer.mozilla.org/En/Using_web_workers).

# Offloading Physics Calculations to a Web Worker

In this example we'll build off exercise
[06-multi-billiard-2.html](https://github.com/lamberta/html5-animation/blob/master/examples/ch11/06-multi-billiard-2.html)
from chapter 11, but take all the collision detection
calculations and move them into a separate web worker
process.

In previous examples, each collision detection step is run
on every frame of the animation loop. This works fine for the
examples in this book, because the amount of calculations
can be done speedily enough as to not hold up the next
animation frame request significantly. This would decrease our
framerate which is typically 60 fps using
`window.requestAnimationFrame` on a fast computer. However,
if we add more and more calculations to process on each
frame, then the browser will in effect “lock up” before
moving on to the next frame, slowing the animation playback
and making the user interaction feel sluggish as the browser
waits to respond.

A solution to this is to create a separate web worker
process that runs a loop with all our collision detection
calculations; we will step its frequency up or down as
needed. In this example we'll run it at 30 fps which is half
the rate of the animation loop (in file
[collision-worker.js](https://github.com/lamberta/html5-animation/blob/master/xtras/web-workers/collision-worker.js)):

    self.setInterval(processFrame, 1000/30);

After the collision detection is calculated, the updated values are
sent to the main script where the balls are updated before being
rendered to the canvas (in document
[web-worker-billiards.html](https://github.com/lamberta/html5-animation/blob/master/xtras/web-workers/web-worker-billiards.html)):

    worker.addEventListener('message', function (event) {
      for (var i = 0, balls_copy = event.data, len = balls_copy.length; i < len; i++) {
        balls[i].x = balls_copy[i].x;
        balls[i].y = balls_copy[i].y;
      }
      renderFrame = true; //used to avoid excessive repaints
    }, false);

Since the physics code is executed at half the frequency as
the animation loop, the canvas only needs to be redrawn
every other frame (ideally). To control this we check the
`renderFrame` flag in our animation loop:

    (function drawFrame () {
      window.requestAnimationFrame(drawFrame, canvas);
      
      if (renderFrame) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach(draw);
        renderFrame = false;
      }
    }());

The code in this example is basically all the same from the
example in chapter 11, just structured differently. The
trickiest part is initializing variables across the main
script and the worker, and making sure to update values
using the passed object copies. The example code has been
commented thoroughly, so make sure you take a look at it.
