import {parseColor} from '../../include/utils.js';

export default class Ball {
  constructor(radius, color) {
    if (radius === undefined) { radius = 40; }
    if (color === undefined) { color = "#ff0000"; }
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = parseColor(color);
    this.lineWidth = 1;
    this.text = '';
    this.angle = 0;
  }
  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);

    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.text) {
      context.font = "24px serif";
      context.fillStyle = '#000000';
      context.fillText(this.text, -6, 6);
      // context.fillText(this.angle.toFixed(4), this.radius, this.radius)
    }
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  }
  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
}
