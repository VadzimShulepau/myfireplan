import Swiper from '../../node_modules/swiper/swiper-bundle.min.js';
import '../../node_modules/swiper/swiper.min.css';

export const slider = new Swiper('.slider', {
  direction: 'horizontal',
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.next-btn',
    prevEl: '.prev-btn',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  // mousewheel: {
  //   sensitivity: 1,
  //   eventsTarget: '.slider',
  // },
  spaceBetween: 40,
  slidesPerGroup: 1,
  loop: true,
  autoplay: {
    delay: 6000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  speed: 500,
  // effect: 'coverflow',
  // coverflowEffect: {
  //   rotate: 30,
  //   stretch: 100,
  //   slideShadows: false,
  // },

  parallax: true,
  breakpoints: {
    1920: {
      slidesPerView: '3',
      centeredSlides: true,
    },
    1360: {
      slidesPerView: '3',
      centeredSlides: true,
    },
    1280: {
      slidesPerView: '2',
      centeredSlides: false,
    },
    770: {
      slidesPerView: '2',
      centeredSlides: false,
    },

    640: {
      slidesPerView: '1',
      centeredSlides: false,
    },
    340: {
      slidesPerView: '1',
      centeredSlides: false,
    },
    320: {
      slidesPerView: '1',
      centeredSlides: false,
    },
  },
});
