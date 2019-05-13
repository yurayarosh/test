import { ANIMATE } from '../constants';

class Animator {
  constructor(el, options) {
    this.el = el;
    this.observerOptions = options ? options.observer : {};
    this.options = options ? options : {};
    this.counter = 0;
  };

  init() {
    this._animate();
  };

  animateEls(entries, observer) {
    entries.forEach((entry) => {
      const el = entry.target;

      const animationName = el.getAttribute('data-anim-name');
      if (!animationName) return;

      const animationDuration = el.getAttribute('data-anim-duration') ? el.getAttribute('data-anim-duration') : '1s';
      const animationDelay = el.getAttribute('data-anim-delay') ? el.getAttribute('data-anim-delay') : '0s';
      const animationIterations = +el.getAttribute('data-anim-iterations');

      el.style.opacity = '0';

      if (entry.isIntersecting) {
        el.classList.add(animationName);
        el.style.animationDuration = animationDuration;
        el.style.animationDelay = animationDelay;

        const DELAY = 1000*((+animationDuration.slice(0, -1)) + (+animationDelay.slice(0, -1)));

        setTimeout(() => {
          el.style.opacity = '1';
          this.counter++;

          if (animationIterations) {
            if (animationIterations === this.counter) {
              observer.unobserve(el);
            };            
          } else if (!this.options.infinite) {
            observer.unobserve(el);
          };
          
        }, DELAY);
      } else {
        el.classList.remove(animationName);
        el.style.animationDuration = '';
        el.style.animationDelay = '';
      };
    });
  };

  _animate() {
    const observer = new IntersectionObserver(this.animateEls.bind(this), this.observerOptions);
    observer.observe(this.el);
  };
};

export default function animateOnScroll() {
  const $els = $('.js-anim-el');

  $els.each((i, el) => {
    const animator = new Animator(el);
    animator.init();
  });
};
