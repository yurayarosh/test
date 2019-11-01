
export default class Swipe {
  constructor(opts) {
    this.opts = opts || {};
    this.target = this.opts.target || document;
    this.resistance = this.opts.resistance || 0;
    this.callbacks = [];
    this.swipeEvent = {};
    this.event = undefined;
    this.xDown = null;
    this.yDown = null;

    this.onTouchStartHandler = this.handleTouchStart.bind(this);
    this.onTouchMovementHandler = this.handleTouchMove.bind(this);
    this.onTouchEndHandler = this.handleTouchEnd.bind(this);

    this.addListeners();
  }

  destroy() {
    this.removeListeners();
    this.callbacks = [];
  }

  addListeners() {
    this.target.addEventListener('touchstart', this.onTouchStartHandler);
    this.target.addEventListener('touchmove', this.onTouchMovementHandler);
    this.target.addEventListener('touchend', this.onTouchEndHandler);
  }

  removeListeners() {
    this.target.removeEventListener('touchstart', this.onTouchStartHandler);
    this.target.removeEventListener('touchmove', this.onTouchMovementHandler);
    this.target.removeEventListener('touchend', this.onTouchEndHandler);
  }

  handleTouchStart(e) {
    const getTouches = (event) => event.touches || event.originalEvent.touches;
    const firstTouch = getTouches(e)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;

    this.swipeEvent.touchStart = e;
  }

  handleTouchMove(e) {
    if (!this.xDown || !this.yDown) {
      return;
    }
    this.swipeEvent.touchMove = e;

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > this.resistance) {
        this.event = 'swipeleft';
      } else if (xDiff < (this.resistance * -1)) {
        this.event = 'swiperight';
      }
    } else if (yDiff > this.resistance) {
      this.event = 'swipeup';
    } else if (yDiff < (this.resistance * -1)) {
      this.event = 'swipedown';
    }

    this.xDown = null;
    this.yDown = null;
  }


  handleTouchEnd(e) {
    this.swipeEvent.touchEnd = e;

    this.callbacks.forEach((obj) => {
      if (obj.event === this.event) {
        obj.callback();
      }
    });
  }

  on(event, callback) {
    const callbackInfo = {};

    callbackInfo.event = event;
    callbackInfo.callback = callback;

    this.callbacks = [...this.callbacks, callbackInfo];

    return this;
  }

  off(event, callback) {
    const callbackInfo = {};

    callbackInfo.event = event;
    callbackInfo.callback = callback;

    this.callbacks = this.callbacks.filter((obj, i) => {
      const removedCallback = callbackInfo.callback === obj.callback
        && callbackInfo.event === obj.event;

      if (!removedCallback) {
        return obj;
      }
      return null;
    });
  }
}

const swipe = new Swipe();

function down() {
  console.log('down');
}


swipe
  .on('swipedown', down)
  .on('swipedown', () => {
    console.log('down second');
  })
  .on('swiperight', () => {
    console.log('right');
    console.log(swipe);
  });

setTimeout(() => {
  swipe
    .off('swipedown', down);
}, 3000);


// console.log('init', swipe);
