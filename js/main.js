"use strict";

const intro = new Swiper(".intro__swiper", {
  slidesPerView: "auto",
  spaceBetween: 48,
  freeMode: true,
  speed: 3000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 5,
    },
  },
  // navigation: {
  //   nextEl: ".about__slide-next",
  //   prevEl: ".about__slide-prev",
  // },
  // pagination: {
  //   el: ".swiper-pagination",
  // // },
  // breakpoints: {
  //   1200: {
  //     //    slidesPerView: 'auto',
  //     //    spaceBetween: 40,
  //   },
  //   830: {
  //     //    slidesPerView: 'auto',
  //   },
  // },
});

const materials = new Swiper(".materials__slider", {
  slidesPerView: 'auto',
  spaceBetween: 24,
  navigation: {
    nextEl: ".materials__btn-next",
    prevEl: ".materials__btn-prev",
  },
  // pagination: {
  //   el: ".swiper-pagination",
  // // },
  // breakpoints: {
  //   1200: {
  //     //    slidesPerView: 'auto',
  //     //    spaceBetween: 40,
  //   },
  //   830: {
  //     //    slidesPerView: 'auto',
  //   },
  // },
});
