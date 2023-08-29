import dataAndPrices from './js/dataAndPrices.js';
import mainFunc from './js/main.js';
import { slider } from './js/swiper.js';
import * as styles from './css/style.css';
import * as flatIcons from './assets/fonts/icon/font/flaticon.css';
import mailer from './js/mailer.js';

dataAndPrices();
mainFunc();

const slide = document.querySelector('.' + styles.slider);
slide ? slider() : null;

const feedbackForm = document.querySelector('.form');
feedbackForm ? mailer(feedbackForm) : null;