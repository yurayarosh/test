// import { TimelineMax } from 'gsap';
import anime  from 'animejs';
import { ACTIVE } from '../constants';

export default class Animator {
  constructor({ direction, $sections, from, to }) {
    this.direction = direction;
    this.$sections = $sections;
    this.from = from;
    this.to = to;
    this.current = $sections[from];
    this.target = $sections[to];
    // this.$pagination = $('.js-pagination');
  };

  animateWithScroll() {
    if (this.direction === 1) {
      // this.tl
      //   .fromTo(this.$sections[this.from], 1, { y: '0%' }, { y: '-100%' })
      //   .fromTo(this.$sections[this.to], 1, { y: '100%' }, { y: '0%' }, '-=1');
      this.tl
        .add({
          targets: this.current,
          translateY: ['0%', '-100%'],
          duration: 1000
        })
        .add({
          targets: this.target,
          translateY: ['100%', '0%'],
          duration: 1000
        }, 0);
    } else {
      // this.tl
      //   .fromTo(this.$sections[this.from], 1, { y: '0%' }, { y: '100%' })
      //   .fromTo(this.$sections[this.to], 1, { y: '-100%' }, { y: '0%' }, '-=1');
      this.tl
        .add({
          targets: this.current,
          translateY: ['0%', '100%'],
          duration: 1000
        })
        .add({
          targets: this.target,
          translateY: ['-100%', '0%'],
          duration: 1000
        }, 0);
    };
  };

  animateWithOverlay() {
    const $overlay = $('.js-overlay');
    this.tl
      // .fromTo($overlay, 1,
      //   { x: '0%', opacity: 0 },
      //   { x: '100%', opacity: 1 })
      // .fromTo(this.$sections[this.from], 1, { opacity: 1, zIndex: 10 }, { opacity: 0, zIndex: -10 }, '-=1')
      // .fromTo(this.$sections[this.to], 1, { opacity: 0, zIndex: -10 }, { opacity: 1, zIndex: 10 }, '-=2');
      .add({
        targets: $overlay[0],
        translateX: ['0%', '100%'],
        skew: ['33deg', '33deg'],
        opacity: [1, 0],
        duration: 750
      })
      .add({
        targets: this.current,
        opacity: [1, 0],
        visibility: ['visible', 'hidden'],
        duration: 750
      }, 0)
      .add({
        targets: this.target,
        opacity: [0, 1],
        visibility: ['hidden', 'visible'],
        duration: 750
      }, 0);
  };



  animate() {
    // const $links = this.$pagination.find('a');
    // const activeLink = $links[this.to];
    
    // const sectionY = this.direction > 0 ? '-100%' : '100%';

    // const $activeTitle = $(this.$sections[this.from]).find('.section__title');
    // const $nextTitle = $(this.$sections[this.to]).find('.section__title');
    // const $activeText = $(this.$sections[this.from]).find('.section__text');
    // const $nextText= $(this.$sections[this.to]).find('.section__text');
    // const $overlay = $('.js-overlay');

    // $links.removeClass(ACTIVE);
    // $(activeLink).addClass(ACTIVE);

    this.tl = anime.timeline({
      easing: 'linear'
    });

    this.tl.finished.then(() => {
      $(this.current).removeClass(ACTIVE);
      $(this.target).addClass(ACTIVE);
    });

    // this.tl = new TimelineMax({ onComplete: () => {
    //   $(this.current).removeClass(ACTIVE);
    //   $(this.target).addClass(ACTIVE);
    // }});

    // this.animateWithScroll();
    this.animateWithOverlay();
    

  };
};

