 
   'use strict'

function accordion () {
   const menuAcco = document.querySelectorAll('.menu__accordeon');
   for (let element of menuAcco) {
     element.addEventListener('click', function () {
         if (element.classList.contains('hidden')) {
           element.classList.remove('hidden');
         }else{
          for (let element of menuAcco) {
            element.classList.remove('hidden');
          };
          element.classList.add('hidden');
         };
       });
      };
    };
    accordion ();



function toTop () {
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 400) {
    toTop.classList.add('show');
  } else {
    toTop.classList.remove('show');
  }
  toTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
});
};
toTop ();

function modal () {
   const modalWindows = document.querySelectorAll('.modal-window');
   const navBar = document.querySelector('.nav__bar');

   let scrollHTML = document.querySelector('html');
  for (let modal of modalWindows) {
    modal.addEventListener('click', function () {
      modal.classList.toggle('modal-open');
      scrollHTML.classList.toggle('scroll');
      navBar.classList.toggle('nav__bar--modal')
      const toTop = document.querySelector('.to-top');
      // document.querySelector('html').style.overflowY='hidden';
      if(toTop.classList.contains('show')) {
        toTop.classList.remove('show');
      };
    });
  };
};
modal();


function navFixed () {
const navBar = document.querySelector('.nav__bar');
const navBarTop = navBar.offsetTop;

window.addEventListener('scroll', function () {
  let scrollDistance = window.pageYOffset;
 if (scrollDistance > navBarTop) {
   navBar.classList.add('nav__bar-fixed');
 }else{
   navBar.classList.remove('nav__bar-fixed');
 };
});
};
navFixed();


function menuDrop() {
const menuBr = document.querySelector('.menu__burger');
const navbBtn = document.querySelector('.nav__button');
const servisesBtn = document.querySelector('.services__button');
servisesBtn.addEventListener('click', function (servisesBtn) {
  servisesBtn.preventDefault();
});
const dropMenu = document.querySelector('.button-drop');
dropMenu.addEventListener('click', function (dropMenu) {
  dropMenu.stopPropagation();
});
menuBr.addEventListener('click', function (e) {
  e.preventDefault();
  menuBr.classList.toggle('open__menu');
  navbBtn.classList.toggle('nav__hidden');
});
};
menuDrop();


function clock() {
let clock = document.querySelector('.clock');
let whatches = new Date();
let hours = whatches.getHours();
let minutes = whatches.getMinutes();
let seconds = whatches.getSeconds();
if (hours<10) {
  hours = '0'+hours;
};
if (minutes<10) {
  minutes = '0'+minutes;
};
if (seconds<10) {
  seconds = '0'+seconds;
};
clock.innerHTML = `${hours}:${minutes}:${seconds}`;
};
setInterval(clock,1000);


function date() {
  let date = document.querySelector('.date');
  let calendar = new Date();
  let day =  calendar.getDate();
  let month =  calendar.getMonth();
  let year =  calendar.getFullYear();
  if (day < 10) {
    day = '0' + day;
  };
 let monthNum = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  date.innerHTML = `${day}.${monthNum[month]}.${year}`;
};
setInterval(date,1000);

function fileView (){
  const formFile = document.querySelector('.form-file');
  if(formFile){
function filePlus (){
  const filePlus = document.querySelector('.file__plus');
  filePlus.addEventListener('click', function (){
    const formFile = document.querySelector('.form-file');
    let formFileNext = formFile.cloneNode(true);
    let fileMinus = document.createElement('div');
    fileMinus.className = 'file__minus';
    fileMinus.innerHTML = '-';
    formFileNext.querySelector('.file__plus').replaceWith(fileMinus);
    formFile.after(formFileNext);
    let name = formFileNext.querySelector('.file-name');
    name.innerText = 'Добавить файл';
    fileMinus.addEventListener('click', function () {
      formFileNext.remove();
    });
    fileChange ();
  }); 
};
filePlus ();

function fileChange () {
  const formFiles = document.querySelectorAll('.form-file');
  for(let formFile of formFiles) {
    formFile.addEventListener('change', function(){
      let fileInput = formFile.querySelector('.file');
      let files = fileInput.files;
       let name = formFile.querySelector('.file-name');
       if (files.length > 0){
         name.innerText = 'Добавлено файлов: ' + files.length;
       } else {
        name.innerText = 'Добавить файл';
       };
    });
  };
  };
  fileChange ();
  
  const forms = document.querySelectorAll('.form');
  forms.forEach(function (form){
    form.addEventListener('submit', function(){
      form.classList.add('sending');
    }); 
  });
  };
};
fileView ();

function slider() {
  const slide = document.querySelector('.slider');
if (slide) {
let slider = new Swiper('.slider',{
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
    slidesPerGroup:1,
    loop: true,
    autoplay: {
      delay: 6000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    speed:500,
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
        slidesPerView:'3',
        centeredSlides:true,
      },
      1360: {
        slidesPerView:'3',
        centeredSlides:true,
      },
      1280: {
        slidesPerView:'2',
        centeredSlides:false,
      },
        770: {
          slidesPerView:'2',
          centeredSlides:false,
        },

        640: {
          slidesPerView:'1',
          centeredSlides:false,
        },
        340: {
          slidesPerView:'1',
          centeredSlides:false,
        },
        320: {
          slidesPerView:'1',
          centeredSlides:false,
        },

    },
});
};
};
slider();

