import $ from 'jquery';
// import dragscroll from 'dragscroll';
// import '@babel/polyfill';
import './lib/polyfill';
import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import createNoise from './components/noise/noise';
// import smoot from './components/smooth.js'
// import 'smooth-scrolling/smooth-scrolling';
// import './components/triangles';
// import './components/triangles/triangles';
// import './components/smooth';

// import './components/dotsGrid';

import mySlider from './components/sliders/setSliders';

import PageRouter from './components/barbaTransitions';
// import './components/pixiTitle';

import './components/swipeEvents';

import setPopups from './components/setPopups';


$(() => {
  sayHello();
  setHTMLClassNames();
  setLazy();

  // createNoise();

  setPopups();

  const wrap = document.querySelector('.out');
  const router = new PageRouter(wrap);
  router.initScripts = () => {
    setLazy();
    // createNoise();
    // smooth()

    mySlider.init();
  };
  router.init();
});
