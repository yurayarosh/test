// import PubSub from 'pubsub-js';
import Animator from './Animator';
import { ACTIVE } from '../constants';

export default class Pager {
  constructor(wrap) {
    this.$wrap = $(wrap);
    this.$sections = this.$wrap.children();
    this.$pagination = $('.js-pagination');
    this.activeSection = 0;
    this.nextSection = 0;
    this.delay = 1400;
    this.allowScroll = true;
  };

  init() {
    if (!this.$sections.length) return;
    $(this.$sections[0]).addClass(ACTIVE);

    this._createPagination();
    this._paginateOnScroll();
    this._paginateOnClick();
  };

  paginate(e) {
    if (!this.allowScroll) return;
    let direction;

    
    if (e.type === 'wheel') {
      e = e.originalEvent;
      direction = e.deltaY > 0 ? 1 : -1;
      this.nextSection = this.activeSection + direction;           
    };
    if (e.type === 'click') {      
      const index = parseInt(e.currentTarget.getAttribute('data-index'));
      if (typeof index !== 'number') return;

      e.preventDefault();
      this.nextSection = index;

      direction = this.nextSection > this.activeSection ? 1 : -1;      
    };

    if (this.nextSection >= this.$sections.length || this.nextSection < 0 || this.nextSection === this.activeSection) return;

    this.allowScroll = false;

    this.$buttons.removeClass(ACTIVE);
    $(this.$buttons[this.nextSection]).addClass(ACTIVE);   

    this.animator = new Animator({
      direction,
      $sections: this.$sections,
      from: this.activeSection,
      to: this.nextSection
    });
  
    this.animator.animate();
  
    this.activeSection = this.nextSection;
    setTimeout(() => {
      this.allowScroll = true;
    }, this.delay);
  };

  _createPagination() {
    if (!this.$pagination.length) return;

    this.$pagination.append('<ul class="pagination__list"></ul>');
    for (let i = 0; i < this.$sections.length; i++) {
      const $list = this.$pagination.find('ul');
      if (i === 0) {
        $list.append(`<li class="pagination__item"><a href="#" class="pagination__link ${ACTIVE}" data-index="${i}">${i + 1}</a></li>`);
      } else {
        $list.append(`<li class="pagination__item"><a href="#" class="pagination__link" data-index="${i}">${i + 1}</a></li>`);
      };      
    };
    this.$buttons = this.$pagination.find('a');
  };

  _paginateOnScroll() {
    $(window).on('wheel', this.paginate.bind(this));
  };

  _paginateOnClick() {
    if (!this.$buttons) return;
    this.$buttons.on('click', this.paginate.bind(this));
  };
};
