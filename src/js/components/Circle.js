export default class Circle {
  constructor({
    x, y, ctx, circleSize = 1.5,
  }) {
    this.coords = { x, y };
    this.ctx = ctx;
    this.distance = 10;
    this.radians = 0;
    this.circleSize = circleSize;
  }

  draw() {
    this.ctx.beginPath();
    // ctx.strokeStyle = 'rgba(151, 151, 151, .3)';

    // this.ctx.moveTo(this.x + 3, this.y);
    // this.ctx.lineTo(this.x + 3, this.y + 6);
    // this.ctx.moveTo(this.x, this.y + 3);
    // this.ctx.lineTo(this.x + 6, this.y + 3);
    // this.ctx.lineWidth = 1;

    this.ctx.arc(
      this.x + this.circleSize,
      this.y + this.circleSize,
      this.circleSize,
      0,
      2 * Math.PI,
    );
    // this.ctx.stroke();
    this.ctx.fill();
  }

  update(mouseX, mouseY) {
    const { x, y } = this.coords;

    if (mouseX > -1) {
      const k1 = mouseY - y;
      const k2 = mouseX - x;
      const tan = k1 / k2;
      let yrad = Math.atan(tan);

      if (mouseX < x) {
        yrad = Math.PI - Math.atan(-tan);
      }

      this.x = x + Math.cos(yrad) * this.distance;
      this.y = y + Math.sin(yrad) * this.distance;
    }
    this.draw();
  }
}
