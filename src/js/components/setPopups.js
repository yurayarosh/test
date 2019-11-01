import Popup from '../lib/popup';

class MyPopup extends Popup {
  constructor(options) {
    super(options);
    this.blah = 'blah';
  }


  // init() {
  //   super.init();
  //   console.log(this);
  // }
}

export default function setPopups() {
  const popup = new MyPopup({
    toggleBodyClass: true,
    escapeHandler: true,
    closeOnOverlayClick: true,
  });
  popup.init();
}
