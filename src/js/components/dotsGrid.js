import Circle from './Circle';

class DotsGrid {
  constructor(wrap) {
    this.wrap = wrap;
    this.size = {
      width: wrap.offsetWidth,
      height: wrap.offsetHeight,
    };
    this.mouseX = 0;
    this.mouseY = 0;
    this.circlesArray = [];
    this.gutter = 30;
    this.circleSize = 1.5;
  }

  _addCanvas() {
    const { width, height } = this.size;
    this.canvas = document.createElement('canvas');

    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;

    this.wrap.appendChild(this.canvas);
  }

  _createGrid() {
    const { width, height } = this.size;

    const countW = Math.floor(width / this.gutter);
    const countH = Math.floor(height / this.gutter);

    for (let i = 0; i < countH; i++) {
      for (let t = 0; t < countW; t++) {
        const x = this.gutter * t;
        const y = this.gutter * i;

        this.circlesArray.push(
          new Circle({
            x,
            y,
            ctx: this.ctx,
            mouseX: this.mouseX,
            mouseY: this.mouseY,
            circleSize: this.circleSize,
          }),
        );
      }
    }

    this.loop();
  }

  _addMousemoveListener() {
    this.canvas.addEventListener('mousemove', (e) => {
      const parentOffset = this.wrap.getBoundingClientRect();
      const relX = e.pageX - parentOffset.left;
      const relY = e.pageY - parentOffset.top;

      this.mouseX = relX;
      this.mouseY = relY;

      this.loop();
    });
  }

  loop() {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height);
    this.circlesArray.forEach((circle) => {
      circle.update(this.mouseX, this.mouseY);
    });
  }

  init() {
    this._addCanvas();
    this._createGrid();
    this._addMousemoveListener();
  }
}

const wraps = [...document.querySelectorAll('.js-canvas-grid')];

wraps.forEach((wrap) => {
  const dotsGrid = new DotsGrid(wrap);
  dotsGrid.init();
});
