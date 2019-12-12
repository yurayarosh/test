import $ from 'jquery'
// import dragscroll from 'dragscroll';
import 'core-js/features/symbol'
import 'core-js/features/array/from'
import 'core-js/features/promise'
import 'core-js/features/object/assign'
import 'core-js/features/set'
import 'intersection-observer'
import './lib/polyfill'
import sayHello from './lib/sayHello'
import setHTMLClassNames from './components/setHTMLClassNames'
import setLazy from './components/setLazy'
import createNoise from './components/noise/noise'
// import smoot from './components/smooth.js'
// import 'smooth-scrolling/smooth-scrolling';
// import './components/triangles';
// import './components/triangles/triangles';
// import './components/smooth';

// import './components/dotsGrid';

import mySlider from './components/sliders/setSliders'

import PageRouter from './components/barbaTransitions'
// import './components/pixiTitle';

import './components/swipeEvents'

import setPopups from './components/setPopups'

import './components/challenge'
// import setScrollbar from './components/setScrollbar';

// import './components/perlinNoise';

import ajaxTest from './components/ajax'
import videoScroll from './components/videoScroll'
import './components/bemjs'
import toggleMenu from './components/toggleMenu'
import setAccordion from './components/setAccordion'
import setTabs from './components/setTabs'

$(() => {
  sayHello()
  setHTMLClassNames()
  setLazy()

  // createNoise();

  setPopups()
  toggleMenu()
  setAccordion()
  setTabs()

  // setScrollbar();

  // ajaxTest();
  videoScroll()

  const wrap = document.querySelector('.out')
  const router = new PageRouter(wrap)
  router.initScripts = () => {
    setLazy()
    // createNoise();
    // smooth()

    mySlider.init()
    // setScrollbar();
  }
  router.init()
})
