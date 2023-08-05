import dataAndPrices from './js/dataAndPrices.js';
import mainFunc from './js/main.js';
import swiper from './js/swiper.js';
import * as styles from './css/style.css';
import * as flatIcons from './assets/fonts/icon/font/flaticon.css';
import './css/swiper-bundle.min.css';

dataAndPrices();
mainFunc();

const slide = document.querySelector('.' + styles.slider);
// console.log(styles.slider)
slide ? swiper() : null;
// console.log(styles)
// console.log(styles.container)
