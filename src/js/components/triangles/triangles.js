// import $ from 'jquery';

import Dot from './Dot';

class Triangles {
  constructor(wrap, options) {
    this.wrap = wrap;
    this.size = {
      width: wrap.offsetWidth,
      height: wrap.offsetHeight,
    };
    this.defaultOptions = {
      number: 150,
      distance: 90,
      dRadius: 900,
      color: '#fc335c',
    };
    this.options = { ...this.defaultOptions, ...options };
    this.dots = [];

    this.canvas = null;
    this.iddle = null;
    this.dot = undefined;
  }

  _addScene() {
    const { width, height } = this.size;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    this.wrap.appendChild(this.canvas);

    this.ctx.fillStyle = this.options.color;
    this.ctx.lineWidth = 0.1;
    this.ctx.strokeStyle = this.options.color;
  }

  _createDots() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.options.number; i++) {
      this.dots.push(new Dot({
        canvas: this.canvas,
        ctx: this.ctx,
        options: this.options,
        dots: this.dots,
      }));
      this.dot = this.dots[i];

      this.dot.create();
    }

    this.dot.line();
    this.dot.animate();

    this.raf = window.requestAnimationFrame(this._createDots.bind(this));
  }

  init() {
    this._addScene();
    this._createDots();
  }
}

const wrap = document.createElement('div');
wrap.className = 'canvas-bg';
const out = document.querySelector('.out');
out.appendChild(wrap);

const triangles = new Triangles(wrap, {
  // distance: 50,
  // color: 'green',
});
triangles.init();
