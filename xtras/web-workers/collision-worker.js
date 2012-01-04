/* The global space of a worker is the 'self' object.
 */
var bounce = -1.0,
    canvas_width, canvas_height, balls, numBalls;

/* The main script sends two messages to the worker for initialization. The first is a
 * an object containing the width and height of the canvas element since web workers
 * cannot access the DOM. The second is a copy of the balls array that we'll use to
 * calculate collision detection here before sending a copy of that back to the main
 * script to render.
 * Once the balls array is initialized, we kick off the processing loop.
 */
self.addEventListener('message', function (event) {
  if (Array.isArray(event.data)) {
    balls = event.data;       //copy of the balls array from the main script
    numBalls = balls.length;
    self.setInterval(processFrame, 1000/30 /*30 fps*/);
  } else {
    canvas_width = event.data.width;
    canvas_height = event.data.height;
  }
}, false);

/* Moves each ball; when finished sends an message to the main script with a
 * copy of this balls array containing the updated positions. 
 * The collision detection loop is running at 30 fps while the render loop is
 * running at 60 fps, so it's up to the main script to coordinate.
 */
function processFrame () {
  //these iterations were in the drawFrame function
  balls.forEach(move);
  for (var ballA, i = 0, len = numBalls - 1; i < len; i++) {
    ballA = balls[i];
    for (var ballB, j = i + 1; j < numBalls; j++) {
      ballB = balls[j];
      checkCollision(ballA, ballB);
    }
  }
  //calculations done, send updated values back to the main script
  self.postMessage(balls);
}

/*
 * Same collision detection code from chapter 11, exercise 06-multi-billiard-2.html ...
 */

function rotate (x, y, sin, cos, reverse) {
  return {
    x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
    y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
  };
}

function checkCollision (ball0, ball1) {
  var dx = ball1.x - ball0.x,
      dy = ball1.y - ball0.y,
      dist = Math.sqrt(dx * dx + dy * dy);
  //collision handling code here
  if (dist < ball0.radius + ball1.radius) {
    //calculate angle, sine, and cosine
    var angle = Math.atan2(dy, dx),
        sin = Math.sin(angle),
        cos = Math.cos(angle),
        //rotate ball0's position
        pos0 = {x: 0, y: 0}, //point
        //rotate ball1's position
        pos1 = rotate(dx, dy, sin, cos, true),
        //rotate ball0's velocity
        vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true),
        //rotate ball1's velocity
        vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true),
        //collision reaction
        vxTotal = vel0.x - vel1.x;
    vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) /
             (ball0.mass + ball1.mass);
    vel1.x = vxTotal + vel0.x;
    //update position - to avoid objects becoming stuck together
    var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
        overlap = (ball0.radius + ball1.radius) - Math.abs(pos0.x - pos1.x);
    pos0.x += vel0.x / absV * overlap;
    pos1.x += vel1.x / absV * overlap;
    //rotate positions back
    var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
        pos1F = rotate(pos1.x, pos1.y, sin, cos, false);
    //adjust positions to actual screen positions
    ball1.x = ball0.x + pos1F.x;
    ball1.y = ball0.y + pos1F.y;
    ball0.x = ball0.x + pos0F.x;
    ball0.y = ball0.y + pos0F.y;
    //rotate velocities back
    var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
        vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
    ball0.vx = vel0F.x;
    ball0.vy = vel0F.y;
    ball1.vx = vel1F.x;
    ball1.vy = vel1F.y;
  }
}

function checkWalls (ball) {
  if (ball.x + ball.radius > canvas_width) {
    ball.x = canvas_width - ball.radius;
    ball.vx *= bounce;
  } else if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
    ball.vx *= bounce;
  }
  if (ball.y + ball.radius > canvas_height) {
    ball.y = canvas_height - ball.radius;
    ball.vy *= bounce;
  } else if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.vy *= bounce;
  }
}

function move (ball) {
  ball.x += ball.vx;
  ball.y += ball.vy;
  checkWalls(ball);
}
