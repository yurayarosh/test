export default class Dot {
  constructor({
    canvas, ctx, options, dots,
  }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.options = options;
    this.dots = dots;
    this.size = {
      width: canvas.width,
      height: canvas.height,
    };

    this.x = Math.random() * this.size.width;
    this.y = Math.random() * this.size.height;

    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();

    this.radius = Math.random();
  }

  create() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
  }

  animate() {
    for (let i = 0; i < this.options.number; i++) {
      this.dot = this.dots[i];

      if (this.dot.y < 0 || this.dot.y > this.size.height) {
        this.dot.vx = this.dot.vx;
        this.dot.vy = -this.dot.vy;
      } else if (this.dot.x < 0 || this.dot.x > this.size.width) {
        this.dot.vx = -this.dot.vx;
        this.dot.vy = this.dot.vy;
      }
      this.dot.x += this.dot.vx;
      this.dot.y += this.dot.vy;
    }
  }

  line() {
    for (let i = 0; i < this.options.number; i++) {
      for (let j = 0; j < this.options.number; j++) {
        const iDot = this.dots[i];
        const jDot = this.dots[j];

        if ((iDot.x - jDot.x) < this.options.distance
          && (iDot.y - jDot.y) < this.options.distance
          && (iDot.x - jDot.x) > -this.options.distance
          && (iDot.y - jDot.y) > -this.options.distance
          && (iDot.x - this.size.width / 2) < this.options.dRadius
          && (iDot.y - this.size.height / 2) < this.options.dRadius
          && (iDot.x - this.size.width / 2) > -this.options.dRadius
          && (iDot.y - this.size.height / 2) > -this.options.dRadius) {
          this.ctx.beginPath();
          this.ctx.moveTo(iDot.x, iDot.y);
          this.ctx.lineTo(jDot.x, jDot.y);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }
    }
  }
}
