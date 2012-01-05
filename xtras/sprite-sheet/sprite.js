/**
 * @constructor
 * @param {Image} spritesheet A sprite sheet is divided into cells and grouped into animation sequences.
 *                            This example assumes an even distribution and positioning within a rectangle.
 * @param {number} columns    Amount of sample images in the animation sequence.
 * @param {number} rows       Amount of different animation sequences on a single sprite sheet.
 */
function Sprite (spritesheet, columns, rows) {
  this.spritesheet = spritesheet;
  this.x = 0;
  this.y = 0;
  //determine the size of a single image cell
  this.width = spritesheet.width / columns;
  this.height = spritesheet.height / rows;
  
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;

  //position on the sprite sheet to start drawing from
  this.offsetX = 0;
  this.offsetY = 0;

  //these account for the player timeline of an animation sequence
  this.isPlaying = false;
  this.counter = 0;                     //Updated every frame that a sequence is being played. From 0 to this.sampleEnd.
  this.sampleRate = 5;                  //The amount of frames to play each sample cell before transitioning to the next. The higher the number, the slower the walk cycle.
  this.sampleChange = this.sampleRate;  //The next change point on the timeline that will cause a sample transition.
  this.sampleEnd = this.sampleRate * columns; //The end of the timeline.
}

/**
 * Select an animation sequence to play, as grouped by rows on the sprite sheet.
 * @param {number} direction  Animation sequence to play. Options: Sprite.RIGHT, Sprite.LEFT, Sprite.DOWN, and Sprite.UP
 */
Sprite.prototype.play = function (direction) {
  /* The sprite sheet is grouped by rows, and each row contains the cells for animating a particular direction.
   * When picking a direction to animate, determine the row's y-offset on the sprite sheet.
   * The class variables (eg. Sprite.UP) have no meaning by themselves, they're just used for convenience.
   */
  switch (direction) {
  case Sprite.RIGHT:
    this.offsetY = 0;                 //row 1
    break;
  case Sprite.LEFT:
    this.offsetY = this.height;       //row 2
    break;
  case Sprite.DOWN:
    this.offsetY = this.height * 2;   //row 3
    break;
  case Sprite.UP:
    this.offsetY = this.height * 3;   //row 4
    break;
  default:
    throw new Error("Unknown Sprite direction.");
  }

  /* If this is the first play, position the player head right before the first change point.
   * Now there's an immediate animation transition instead of waiting through all the frames of the first sample.
   */
  if (!this.isPlaying) {
    this.counter = this.sampleRate - 1;
    this.isPlaying = true;
  }
};

/**
 * Stop playing the animation and reset the sample sequence.
 */
Sprite.prototype.stop = function () {
  this.isPlaying = false;
  this.resetCounter();
};

/**
 * Resets the counter and x-offset on the sprite sheet to point to the first sample of the animation sequence.
 */
Sprite.prototype.resetCounter = function () {
  this.counter = 0;
  this.offsetX = 0;
  this.sampleChange = this.sampleRate;
};

/**
 * Keeps track of the frame counter and timeline change points.
 * Each sample cell in an animation sequence is rendered a set amount of frames (as determined by this.sampleRate) before
 * moving on to the next sample. When the counter has reached the end of the sequence it is reset.
 */
Sprite.prototype.tick = function () { 
  if (this.counter === this.sampleEnd) {
    this.resetCounter();
  } else if (this.counter === this.sampleChange) {
    //once a change point has been reached, update the x-offset on the sprite sheet to point to a new sample.
    this.offsetX += this.width;
    this.sampleChange += this.sampleRate; //set next change point
  }
  this.counter += 1;
};

Sprite.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  
  if (this.isPlaying === true) {
    this.tick();
  }
  /* Draws a slice from the source image to the canvas element destination.
   * This can be used to scale the image slice, which is the reason for some redundant arguments here.
   * Parameters: srcImage, srcImage_offsetX, srcImage_offsetY, srcImage_width, srcImage_height, dest_x, dest_y, dest_width, dest_height
   */
  context.drawImage(this.spritesheet, this.offsetX, this.offsetY, this.width, this.height, 0, 0, this.width, this.height);
  context.restore();
};

/* class variables
 */

Sprite.LEFT = 0;
Sprite.UP = 1;
Sprite.RIGHT = 2;
Sprite.DOWN = 3;
