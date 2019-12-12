import Smooth from 'smooth-scrolling';

class Scroll {
  constructor(wrap) {
    this.wrap = wrap;
    this.parallaxEls = [...document.querySelectorAll('.js-parallax')];
    this.visibleParallaxEls = [];
    this.scrollableEls = [...document.querySelectorAll('.js-scrollable')];
    this.state = {
      enterScrollableEl: false,
    };
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

  makeParralaxElsArray(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.visibleParallaxEls = [...this.visibleParallaxEls, entry.target];
      } else {
        this.visibleParallaxEls = this.visibleParallaxEls
          .filter((target) => target !== entry.target);
      }
    });
  }

  handleObserving(entries, observer) {
    this.makeParralaxElsArray(entries);
  }

  animateParallaxEls() {
    if (!this.visibleParallaxEls.length) return;

    this.visibleParallaxEls.forEach((el) => {
      const block = el;

      const speed = -((+block.dataset.speed / 10) * 0.4) || -0.2;
      const blockTop = block.getBoundingClientRect().top;
      const blockHeight = block.offsetHeight;
      const diff = Math.floor(blockTop - window.pageYOffset);

      if (diff > window.innerHeight) {
        block.style.transform = 'translate3D(0px, 0px, 0px)';
      } else if (diff > 0) {
        block.style.transform = `translate3D(0px, ${diff * speed}px, 0px)`;
      } else if (diff <= 0 && diff >= -blockHeight) {
        block.style.transform = `translate3D(0px, ${diff * speed}px, 0px)`;
      }
    });
  }

  disablePageScroll(e) {
    console.log(e.target, this);
    this.smooth.off();
  }

  alllowPageScroll(e) {
    this.smooth.on();
  }

  handleScrollableElEnter(e) {
    if (this.state.enterScrollableEl) return;
    const el = e.target && e.target !== document ? e.target.closest('.js-scrollable') : null;
    if (!el) return;
    this.state.enterScrollableEl = true;
    // this.disablePageScroll(e);

    console.log('enter');
  }

  handleScrollableElLeave(e) {
    const el = e.target && e.target !== document ? e.target.closest('.js-scrollable') : null;
    if (!el) return;
    if (!this.state.enterScrollableEl) return;
    // this.alllowPageScroll(e);
    this.state.enterScrollableEl = false;

    console.log('leave');
  }

  onScroll() {
    this.animateParallaxEls();
  }

  onWheel(e) {
    this.scrollHorizontal(e);
  }

  onMouseEnter(e) {
    this.handleScrollableElEnter(e);
  }

  onMouseLeave(e) {
    this.handleScrollableElLeave(e);
  }


  _initPlugin() {
    document.body.style.overflow = 'hidden';
    this.smooth = new Smooth({
      section: this.wrap,
      ease: 0.05,
      callback: this.onScroll.bind(this),
    });
    this.smooth.init();
  }

  _observe() {
    this.observer = new IntersectionObserver(this.handleObserving.bind(this));
    this.parallaxEls.forEach((el) => {
      this.observer.observe(el);
    });
  }

  _addListeners() {
    this.handleOnWheel = this.onWheel.bind(this);
    this.handleMouseEnter = this.onMouseEnter.bind(this);
    this.handleMouseLeave = this.onMouseLeave.bind(this);

    // window.addEventListener('wheel', this.handleOnWheel, { passive: false });
    document.addEventListener('mouseenter', this.handleMouseEnter, true);
    document.addEventListener('mouseleave', this.handleMouseLeave, true);
  }

  init() {
    this._initPlugin();
    this._addListeners();

    this._observe();

    // this.animateParallaxEls();
  }
}

const wrap = document.querySelector('.out');

const scroll = new Scroll(wrap);
scroll.init();

console.log(scroll);
