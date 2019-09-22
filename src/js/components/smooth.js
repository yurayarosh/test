import Smooth from 'smooth-scrolling';

class Scroll {
  constructor(wrap) {
    this.wrap = wrap;
  }

  scrollHorizontal(e) {
    e.preventDefault();
    let { target } = this.smooth.vars;
    const { width } = this.smooth.vars;

    target += ((e.deltaY / 10) * 4);
    this.smooth.vars.target = target;
    if (target < 0) {
      this.smooth.vars.target = 0;
    } else if (target > width) {
      this.smooth.vars.target = width;
    }
  }

  _setHorizontalScroll() {
    window.addEventListener('wheel', this.scrollHorizontal.bind(this), { passive: false });
  }

  _initPlugin() {
    this.smooth = new Smooth({
      section: this.wrap,
      ease: 0.05,
      direction: 'horizontal',
    });
    this.smooth.init();
    // this.smooth.vs.off(this.smooth.vs._onWheel, this.smooth.vs);
    // this.smooth.vs.off(this.smooth.vs._onMouseWheel, this.smooth.vs);
    this.smooth.vs.destroy();
  }

  init() {
    this._initPlugin();
    this._setHorizontalScroll();
  }
}

const wrap = document.querySelector('.out');

const scroll = new Scroll(wrap);
scroll.init();
