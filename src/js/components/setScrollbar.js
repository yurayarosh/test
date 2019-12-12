import SimpleBar from 'simplebar';
import { isWebkit } from '../helpers';

class Scrollbar extends SimpleBar {
  constructor(el, options) {
    super(el, options);
    this.contentHTML = this.contentEl.innerHTML;
  }

  destroy() {
    this.unMount();
    this.el.innerHTML = this.contentHTML;
    this.el.removeAttribute('data-simplebar');
  }
}

export default function setScrollbar() {
  if (isWebkit) return;
  const containers = [...document.querySelectorAll('.js-scrollbar')];
  if (!containers.length) return;

  const simplebars = [];
  containers.forEach((container) => {
    const scrollbar = new Scrollbar(container);
    simplebars.push(scrollbar);
  });

  // document.body.addEventListener('click', () => {
  //   simplebars[1].destroy();
  // });
}
