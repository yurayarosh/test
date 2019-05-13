class Burger {
  constructor({ burger = 'js-burger', target = 'js-menu' }) {
    this.$burgers = $(`.${burger}`);
    this.$targets = $(`.${this.target}`);
    this.target = target;
    this.ACTIVE = 'is-active';
    this.$DOC = $(document);
  };

  init() {
    this.$burgers.on('click', this._toggle.bind(this));
  };

  _toggle(e) {
    e.preventDefault();

    const name = e.currentTarget.getAttribute('data-burger-target');
    const $target = $(`.${this.target}[data-burger="${name}"]`);

    $(e.currentTarget).toggleClass(this.ACTIVE);
    $target.toggleClass(this.ACTIVE);

    if (this.onToggle) {
      this.onToggle(e.currentTarget, $target);
    };
  };

  close() {
    this.$burgers.each((i, burger) => {
      // if (!$(burger).hasClass(this.ACTIVE)) return;

      $(burger).removeClass(this.ACTIVE);
      this.$targets.removeClass(this.ACTIVE);

      if (this.onClose) {
        this.onClose($burgers, $targets);
      };
    });    
  };
};


export default function toggleMenu() {
  const burger = new Burger({});
  burger.onToggle = (burger, $target) => {
    $('body').toggleClass('no-scroll');
  };
  burger.init();

  $(document).on('click', (e) => {
    burger.close();
  });
}
