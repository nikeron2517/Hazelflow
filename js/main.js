"use strict";

const swiper = new Swiper(".intro__swiper", {
  loop: true,
  autoplay: {
    delay: 500,
    disableOnInteraction: false,
  },
  spaceBetween: 50,
  slidesPerView: 5,
  slidesPerGroup: 1,
   watchSlidesProgress: true,
  watchSlidesVisibility: true,
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
