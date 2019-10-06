import barba from '@barba/core';
import { TimelineLite, Power2 } from 'gsap';

export default class PageRouter {
  constructor(wrap) {
    this.wrap = wrap;
    this.tl = new TimelineLite();
  }

  defaultLeave(container, resolve) {
    const header = document.querySelector('.header');

    this.tl
      .fromTo(
        this.overlay,
        1,
        {
          opacity: 0,
          visibility: 'hidden',
          ease: Power2.easeOut,
        },
        {
          opacity: 1,
          visibility: 'visible',
          ease: Power2.easeOut,
        },
      )
      .to(container, 1, {
        opacity: 0,
        scale: 0,
        ease: Power2.easeOut,
        onComplete: () => {
          console.log('end current page default transiton');
          header.classList.remove('is-white');
          resolve();
        },
      }, '-=1');
  }

  defaultEnter(container) {
    this.tl
      .fromTo(
        this.overlay,
        1,
        { opacity: 1 },
        { opacity: 0 },
      )
      .fromTo(
        container,
        1,
        {
          opacity: 0,
          scale: 0,
          ease: Power2.easeOut,
        },
        {
          opacity: 1,
          scale: 1,
          ease: Power2.easeOut,
          onComplete: () => {
            this.overlay.style.visibility = 'hidden';
          },
        },
        '-=1',
      );
  }

  showCoverImg(trigger) {
    this.coverImage = document.createElement('div');
    this.coverImage.className = 'cover-image';

    const { coverImg } = trigger.dataset;
    const {
      width, height, top, left,
    } = trigger.getBoundingClientRect();

    const documentSize = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };

    const scaleX = width / documentSize.width;
    const scaleY = height / documentSize.height;
    const translateX = `${left / scaleX}px`;
    const translateY = `${top / scaleY}px`;

    this.coverImage.style.backgroundImage = `url(${coverImg})`;
    this.coverImage.style.transform = `scale(${scaleX}, ${scaleY}) translate(${translateX}, ${translateY})`;

    this.wrap.appendChild(this.coverImage);
  }

  productsPageLeave(data, resolve) {
    const { trigger } = data;
    this.showCoverImg(trigger);

    this.tl
      .to(
        this.coverImage,
        1,
        {
          scale: 1,
          x: 0,
          y: 0,
          ease: Power2.easeOut,
          onComplete: () => {
            this.coverImage.parentNode.removeChild(this.coverImage);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            console.log('end product-page-link transition');

            resolve();
          },
        },
      );
  }

  productPageEnter(container) {
    const title = container.querySelector('h1');
    const hero = container.querySelector('.hero');
    const header = document.querySelector('.header');

    hero.classList.add('no-animation');
    const { backgroundImage } = hero.dataset;
    hero.style.backgroundImage = `url(${backgroundImage})`;
    header.classList.add('is-white');

    this.tl
      .fromTo(
        title,
        1,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
      );
  }

  _addOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'overlay';
    this.wrap.appendChild(this.overlay);
  }

  _initBarba() {
    const self = this;
    barba.init({
      transitions: [
        {
          name: 'default-transition',
          sync: false,
          appear() {
            if (self.initScripts) {
              self.initScripts();
            }
          },
          leave({ current }) {
            return new Promise((resolve) => {
              const { container } = current;
              self.defaultLeave(container, resolve);
            });
          },
          enter({ next }) {
            if (self.initScripts) {
              self.initScripts();
            }
            console.log('enter new page default transition');
            const { container } = next;

            self.defaultEnter(container);
          },

        },
        {
          name: 'product-page-transition',
          sync: false,
          from: {
            custom: ({ trigger }) => trigger.classList && trigger.classList.contains('product'),
          },
          leave(data) {
            return new Promise((resolve) => {
              self.productsPageLeave(data, resolve);
            });
          },
          enter({ next }) {
            if (self.initScripts) {
              self.initScripts();
            }
            console.log('enter product-page');

            const { container } = next;
            self.productPageEnter(container);
          },
        },
      ],
    });
  }

  init() {
    this._addOverlay();
    this._initBarba();
  }
}
