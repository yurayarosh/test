import * as PIXI from 'pixi.js';
import { ShockwaveFilter } from 'pixi-filters';
import { TimelineLite } from 'gsap';

class WordBg {
  constructor(wrap) {
    this.wrap = wrap;
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  _addScene() {
    const { width, height } = this.size;
    this.app = new PIXI.Application({
      width,
      height,
      transparent: true,
    });
    this.app.stage.interactive = true;

    this.wrap.appendChild(this.app.view);
    this.app.view.style.display = 'block';
    // this.app.view.style.backgroundImage = 'linear-gradient(to right, #0f2027, #203a43, #2c5364)';

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    this.bg = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bg_grass.jpg');
    this.bg.width = this.app.screen.width;
    this.bg.height = this.app.screen.width;

    // this.bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    // this.bg.width = this.app.screen.width;
    // this.bg.height = this.app.screen.width;
    // this.bg.tint = 0xFF00FF;


    this.container.addChild(this.bg);
  }

  _addTitle() {
    const style = new PIXI.TextStyle({
      fontFamily: 'Helvetica',
      fontSize: 100,
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
    });

    this.title = new PIXI.Text('Awesome Title', style);

    this.title.anchor.set(0.5);
    this.title.position.x = this.size.width / 2;
    this.title.position.y = this.size.height / 2;

    this.app.stage.addChild(this.title);
  }

  _addFilter() {
    // this.displacementSprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/pixi-filters/displace.png');
    // this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.shockwaveFilter = new ShockwaveFilter();
    // this.shockwaveFilter.time = 1;
    this.shockwaveFilter.radius = 100;

    this.shockwaveFilter.center.x = this.size.width / 2;
    this.shockwaveFilter.center.y = this.size.height / 2;

    // this.app.stage.addChild(this.displacementSprite);

    this.container.filters = [this.shockwaveFilter];

    this.ticker = PIXI.Ticker.shared;

    function animateFilter() {
      this.shockwaveFilter.time += 0.01;
      this.anamtingFilter = true;
    }

    function onPointerMove(eventData) {
      // const { filters } = this.container;
      // this.filterIndex += 1;
      // createFilter.call(this);
      // const tl = new TimelineLite({
      //   onComplete: () => {
      //     this.container.filters = filters.filter((filter, i) => i !== this.filterIndex);
      //   },
      // });
      // tl
      //   .fromTo(
      //     this.shockwaveFilter,
      //     3,
      //     { time: 0 },
      //     { time: 1 },
      //   );

      this.shockwaveFilter.center.x = eventData.data.global.x - 25;
      this.shockwaveFilter.center.y = eventData.data.global.y;
    }
    function onPointerDown(e) {
      if (this.anamtingFilter) {
        this.ticker.remove(animateFilter, this);
      }
      this.ticker.add(animateFilter, this);

      // const tl = new TimelineLite();
      // tl
      //   .fromTo(
      //     this.shockwaveFilter,
      //     3,
      //     { time: 0 },
      //     { time: 1 },
      //   );

      // console.log(this.container.filters);

      // const tl = new TimelineLite();
      // tl
      //   .fromTo(
      //     this.shockwaveFilter,
      //     3,
      //     { time: 0 },
      //     { time: 3 },
      //   );
    }
    this.app.stage
      .on('pointerdown', onPointerDown.bind(this))
      .on('mousemove', onPointerMove.bind(this));
  }

  init() {
    this._addScene();
    this._addTitle();
    this._addFilter();
  }
}

const wrap = document.querySelector('.out');
const wordBg = new WordBg(wrap);
wordBg.init();
