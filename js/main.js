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
  slidesPerView: "auto",
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

const items = document.querySelectorAll(".faqs__item");

items.forEach((item) => {
  const text = item.querySelector(".faqs__item-text");

  text.addEventListener("transitionend", (e) => {
    if (e.propertyName === "max-height" && item.classList.contains("faqs__item--active")) {
      text.style.maxHeight = "none"; // снимаем ограничение после раскрытия
    }
    if (e.propertyName === "max-height" && !item.classList.contains("faqs__item--active")) {
      text.style.maxHeight = "0px";
    }
  });

  item.addEventListener("click", () => {
    const isActive = item.classList.contains("faqs__item--active");

    if (isActive) {
      // Закрытие: плавно схлопываем
      const t = text;
      t.style.maxHeight = t.scrollHeight + "px"; // выставляем текущую высоту
      // форсируем перерисовку
      t.offsetHeight;
      t.style.maxHeight = "0px";
      item.classList.remove("faqs__item--active");
      return;
    }

    // Закрываем все остальные
    items.forEach((i) => {
      if (i !== item) {
        i.classList.remove("faqs__item--active");
        const t = i.querySelector(".faqs__item-text");
        t.style.maxHeight = t.scrollHeight + "px";
        t.offsetHeight;
        t.style.maxHeight = "0px";
      }
    });

    // Открытие
    item.classList.add("faqs__item--active");
    text.style.maxHeight = "0px";
    setTimeout(() => {
      text.style.maxHeight = text.scrollHeight + "px";
    }, 15);
  });
});

// Burger menu logic
const navBtn = document.querySelector(".nav-btn");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavBackdrop = document.querySelector(".mobile-nav-backdrop");
const mobileNavClose = document.querySelector(".mobile-nav__close");

if (navBtn && mobileNav) {
  navBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    mobileNav.classList.toggle("active");
    if (mobileNav.classList.contains("active")) {
      document.body.style.overflow = "hidden";
      if (mobileNavBackdrop) mobileNavBackdrop.style.display = "block";
    } else {
      document.body.style.overflow = "";
      if (mobileNavBackdrop) mobileNavBackdrop.style.display = "none";
    }
  });

  // Закрытие по клику вне меню
  document.addEventListener("click", function (e) {
    if (mobileNav.classList.contains("active")) {
      if (!mobileNav.contains(e.target) && !navBtn.contains(e.target)) {
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
        if (mobileNavBackdrop) mobileNavBackdrop.style.display = "none";
      }
    }
  });

  // Закрытие по клику на пункт меню
  mobileNav.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
      if (mobileNavBackdrop) mobileNavBackdrop.style.display = "none";
    });
  });

  // Закрытие по клику на подложку
  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
      mobileNavBackdrop.style.display = "none";
    });
  }

  // Закрытие по клику на крестик
  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
      if (mobileNavBackdrop) mobileNavBackdrop.style.display = "none";
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const workflowItemsBlock = document.querySelector('.workflow__items');
  const workflowItems = document.querySelectorAll('.workflow__item');

  if (workflowItemsBlock && workflowItems.length) {
    workflowItemsBlock.addEventListener('mouseleave', () => {
      workflowItems.forEach(item => {
        item.classList.remove('is-bouncing');
        void item.offsetWidth;
        item.classList.add('is-bouncing');
      });
    });

    workflowItems.forEach(item => {
      item.addEventListener('animationend', () => {
        item.classList.remove('is-bouncing');
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const infoContent = document.querySelector('.info__content');
  const leftImg = document.querySelector('.info__bg-img--left');
  const rightImg = document.querySelector('.info__bg-img--right');
  const leftBlock = document.querySelector('.info__item--left');
  const centerBlock = document.querySelector('.info__item--center');
  const rightBlock = document.querySelector('.info__item--right');

  if (infoContent) {
    infoContent.addEventListener('click', function handler() {
      if (leftImg) leftImg.classList.add('animated');
      if (rightImg) rightImg.classList.add('animated');
      if (leftBlock) leftBlock.classList.add('animated');
      if (centerBlock) centerBlock.classList.add('animated');
      if (rightBlock) rightBlock.classList.add('animated');

      setTimeout(() => {
        if (leftImg) leftImg.classList.remove('animated');
        if (rightImg) rightImg.classList.remove('animated');
        if (leftBlock) leftBlock.classList.remove('animated');
        if (centerBlock) centerBlock.classList.remove('animated');
        if (rightBlock) rightBlock.classList.remove('animated');
      }, 900); // чуть меньше, чтобы быстрее возвращалось
    });
  }
});


