export default function mainFunc() {

  function accordion() {
    const menuAcco = document.querySelectorAll('.menu__accordeon');
    for (let element of menuAcco) {
      element.addEventListener('click', function () {
        if (element.classList.contains('hidden')) {
          element.classList.remove('hidden');
        } else {
          for (let element of menuAcco) {
            element.classList.remove('hidden');
          };
          element.classList.add('hidden');
        };
      });
    };
    // console.log('accordion')
  };
  accordion();


  function toTop() {
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
    // console.log('to-top')
  };
  toTop();

  function modal() {
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
        if (toTop.classList.contains('show')) {
          toTop.classList.remove('show');
        };
      });
    };
    // console.log('modal')
  };
  modal();


  function navFixed() {
    const navBar = document.querySelector('.nav__bar');
    const navBarTop = navBar.offsetTop;

    window.addEventListener('scroll', function () {
      let scrollDistance = window.pageYOffset;
      if (scrollDistance > navBarTop) {
        navBar.classList.add('nav__bar-fixed');
      } else {
        navBar.classList.remove('nav__bar-fixed');
      };
    });
    // console.log('fix nav bar')
  };
  navFixed();


  function menuDrop() {
    const menuBr = document.querySelector('.menu__burger');
    const navBtn = document.querySelector('.nav__button');
    const servicesBtn = document.querySelector('.services__button');
    servicesBtn.addEventListener('click', function (servicesBtn) {
      servicesBtn.preventDefault();
    });
    const dropMenu = document.querySelector('.button-drop');
    dropMenu.addEventListener('click', function (dropMenu) {
      dropMenu.stopPropagation();
    });
    menuBr.addEventListener('click', function (e) {
      e.preventDefault();
      menuBr.classList.toggle('open__menu');
      navBtn.classList.toggle('nav__hidden');
    });
    // console.log('drop-menu')
  };
  menuDrop();


  function clock() {
    const clock = document.querySelector('.clock');
    let watches = new Date();
    let hours = watches.getHours();
    let minutes = watches.getMinutes();
    let seconds = watches.getSeconds();
    if (hours < 10) {
      hours = '0' + hours;
    };
    if (minutes < 10) {
      minutes = '0' + minutes;
    };
    if (seconds < 10) {
      seconds = '0' + seconds;
    };
    clock.textContent = `${hours}:${minutes}:${seconds}`;
  };
  setInterval(clock, 1000);


  function date() {
    const date = document.querySelector('.date');
    let calendar = new Date();
    let day = calendar.getDate();
    let month = calendar.getMonth();
    let year = calendar.getFullYear();
    if (day < 10) {
      day = '0' + day;
    };
    const monthNum = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    date.textContent = `${day}.${monthNum[month]}.${year}`;
  };
  setInterval(date, 1000);

  function toggleNavLink() {
    const currentLink = location.pathname.split('/').at(-1);
    const navLinks = document.querySelectorAll('nav li');

    for (let navLink of navLinks) {
      const navLinkA = navLink.querySelector('a').href.split('/').at(-1);
      (navLinkA === currentLink) && navLink.classList.add('nav__button-active');
      (navLink.classList.contains('services__button')) && ((currentLink === 'evacuation_plan.html') || (currentLink === 'products.html')) && navLink.classList.add('nav__button-active');
    };
  };
  window.addEventListener('load', toggleNavLink);
};
