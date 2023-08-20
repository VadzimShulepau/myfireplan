import dataAndPrices from './js/dataAndPrices.js';
import mainFunc from './js/main.js';
import swiper from './js/swiper.js';
import * as styles from './css/style.css';
import * as flatIcons from './assets/fonts/icon/font/flaticon.css';
import * as swiperStyles from'./css/swiper-bundle.min.css';
import mailer from './js/mailer.js';

dataAndPrices();
mainFunc();
mailer();

const slide = document.querySelector('.' + styles.slider);
slide ? swiper() : null;
