import { throttle } from 'throttle-debounce';

class ScrollVideo {
  constructor(wrap) {
    this.wrap = wrap;
    this.scrollTrigger = 0;
    this.input = document.querySelector('.js-scroll-video-inut');
    this.src = wrap.dataset.src;
    this.frames = +wrap.dataset.frames;
    this.video = document.createElement('video');
    this.size = {
      width: wrap.offsetWidth,
      height: wrap.offsetHeight,
    };

    this.images = [];
    this.index = 0;
  }

  _addStage() {
    const { width, height } = this.size;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;

    this.wrap.appendChild(this.canvas);
  }

  _addListeners() {
    this.onScrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.onScrollHandler);
    this.video.addEventListener('click', () => {
      this.video.play();
    });
  }

  _createFrames() {
    for (let i = 1; i <= this.frames; i++) {
      const frameNmb = (i * 5) + 21;

      let frameName;
      switch (frameNmb.toString().length) {
        case 5:
          frameName = frameNmb;
          break;
        case 4:
          frameName = `0${frameNmb}`;
          break;
        case 3:
          frameName = `00${frameNmb}`;
          break;
        case 2:
          frameName = `000${frameNmb}`;
          break;
        case 1:
          frameName = `0000${frameNmb}`;
          break;
        default:
          frameName = frameNmb;
          break;
      }

      const src = this.src.replace(/{frame}/i, frameName);
      const img = new Image();
      img.src = src;
      this.images.push(img);
    }
  }


  handleScroll() {
    const windowTop = window.pageYOffset;
    this.direction = windowTop > this.scrollTrigger ? 100 : -100;
    this.scrollTrigger = windowTop <= 0 ? 0 : windowTop;

    this.drawCanvas();
  }

  drawCanvas() {
    const { width, height } = this.size;

    if (this.direction > 0) {
      this.index += 1;
    } else {
      this.index -= 1;
    }

    console.log(this.index);


    const currentImage = this.images[this.index];


    this.ctx.drawImage(
      currentImage,
      0,
      0,
      width,
      height,
    );
  }


  init() {
    this._createFrames();
    this._addStage();
    this._addListeners();
  }
}

export default () => {
  const wrap = document.querySelector('.js-scroll-video');
  const scrollVideo = new ScrollVideo(wrap);
  scrollVideo.init();
};
