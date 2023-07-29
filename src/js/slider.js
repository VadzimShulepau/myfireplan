import Swiper from 'swiper';
import 'swiper/css';

export default function slider() {
  const slide = document.querySelector('.slider');
  if (slide) {
    const slider = new Swiper('.slider', {
      navigation: {
        nextEl: '.next-btn',
        prevEl: '.prev-btn'
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
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
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
  };
};
// slider();
