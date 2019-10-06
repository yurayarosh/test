import Slider from './Slider';
import classNames from './classNames';

class MySlider {
  constructor(slider) {
    this.sliderClass = slider;
  }

  _getOptions() {
    this.getOptions = ({
      navigation, onInit,
    }) => ({
      default: {
        slidesPerView: 1,
        grabCursor: true,
        navigation,
        on: {
          init: onInit,
        },
      },
    });
  }

  _initSliders() {
    this.sliders = [];

    this.containers.forEach((container) => {
      if (container.classList.contains(classNames.plugin.initialized)) return;

      const slider = new Slider(container, this.getOptions);
      slider.init();
      this.sliders.push(slider);
    });
  }


  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)];
    if (!this.containers.length) return;

    this._getOptions();
    this._initSliders();
  }
}

const mySlider = new MySlider('.js-slider');

export default mySlider;
