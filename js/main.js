"use strict";

const swiper = new Swiper('.about__slider', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 40,
    navigation: {
      nextEl: '.about__slide-next',
      prevEl: '.about__slide-prev',
    },
    pagination: {
        el: '.swiper-pagination',
      },
    breakpoints: {
        1200: {
        //    slidesPerView: 'auto',
        //    spaceBetween: 40,
        },
        830: {
        //    slidesPerView: 'auto',
        }
     },
  });