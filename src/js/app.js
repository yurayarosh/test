import setTouchClassName from './setTouchClassName.js';
import Select from  './lib/customSelect';
import inView from './components/inView';

import setPage from './setPage';
import toggleMenu from './components/toggleMenu';

$(function() {
  // const selects = [].slice.call(document.querySelectorAll('.js-select'));

  // const panelInput = document.createElement('input');
  // panelInput.type = 'text';

  // function addOptionItem(option, customOption) {
  //   // const color = option.dataset.color;
  //   // if (!color) return;
  //   const icon = option.getAttribute('data-icon');
  //   console.log();
  //   const inner = customOption.innerHTML;
  //   customOption.innerHTML = icon+inner;
  // };

  // selects.forEach(function(el) {
  //   const type = el.getAttribute('data-type');
  //   const options = {
  //     search: {
  //       panelItem: {
  //         item: '<input type="text" />',
  //         position: 'top',
  //         className: 'js-search'
  //       },
  //       optionBuilder: addOptionItem
  //     }
  //   };

  //   const select = new Select(el, options[type]);
  //   select.init();
  // });

  // setTouchClassName();
  setPage();
  // inView();
  // toggleMenu();
});

window.$ = $;

window.setTouchClassName = setTouchClassName;
