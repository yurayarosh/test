import $ from 'jquery';
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

import './components/dotsGrid';

$(() => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  // createNoise();
  // smooth()
});
