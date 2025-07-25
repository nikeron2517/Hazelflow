"use strict";

const introSwiper = new Swiper(".intro__swiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: false,
  freeMode: true,
  allowTouchMove: false,
  centeredSlides: false,
  breakpoints: {
    850: {
      slidesPerView: "2",
      spaceBetween: 30,
    },
  },
});

function startAutoScrollToLastCenter(swiper, pxPerFrame = 1.2) {
  const interval = setInterval(() => {
    const swiperEl = swiper.el;
    const swiperRect = swiperEl.getBoundingClientRect();
    const swiperCenter = swiperRect.left + swiperRect.width / 2;
    const lastSlide = swiper.slides[swiper.slides.length - 1];
    const lastSlideRect = lastSlide.getBoundingClientRect();
    const lastSlideCenter = lastSlideRect.left + lastSlideRect.width / 2;
    if (Math.abs(lastSlideCenter - swiperCenter) < 2) {
      clearInterval(interval);
      return;
    }
    swiper.setTranslate(swiper.getTranslate() - pxPerFrame);
  }, 16);
}

const materials = new Swiper(".materials__slider", {
  slidesPerView: "auto",
  spaceBetween: 24,
  navigation: {
    nextEl: ".materials__btn-next",
    prevEl: ".materials__btn-prev",
  },
  breakpoints: {
   500: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
   300: {
      slidesPerView: "2",
      spaceBetween: 15,
    },
  },
});

// FAQ аккордеон
const items = document.querySelectorAll(".faqs__item");
items.forEach((item) => {
  const text = item.querySelector(".faqs__item-text");
  text.addEventListener("transitionend", (e) => {
    if (e.propertyName === "max-height" && item.classList.contains("faqs__item--active")) {
      text.style.maxHeight = "none";
    }
    if (e.propertyName === "max-height" && !item.classList.contains("faqs__item--active")) {
      text.style.maxHeight = "0px";
    }
  });
  item.addEventListener("click", () => {
    const isActive = item.classList.contains("faqs__item--active");
    if (isActive) {
      const t = text;
      t.style.maxHeight = t.scrollHeight + "px";
      t.offsetHeight;
      t.style.maxHeight = "0px";
      item.classList.remove("faqs__item--active");
      return;
    }
    items.forEach((i) => {
      if (i !== item) {
        i.classList.remove("faqs__item--active");
        const t = i.querySelector(".faqs__item-text");
        t.style.maxHeight = t.scrollHeight + "px";
        t.offsetHeight;
        t.style.maxHeight = "0px";
      }
    });
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
    toggleMobileMenu();
  });
  
  document.addEventListener("click", function (e) {
    if (mobileNav.classList.contains("active")) {
      if (!mobileNav.contains(e.target) && !navBtn.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });
  
  mobileNav.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("click", function () {
      closeMobileMenu();
    });
  });
  
  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener("click", function () {
      closeMobileMenu();
    });
  }
  
  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", function () {
      closeMobileMenu();
    });
  }
  
  function toggleMobileMenu() {
    const isActive = mobileNav.classList.contains("active");
    
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
  
  function openMobileMenu() {
    // Добавляем класс к кнопке бургера
    navBtn.classList.add("active");
    
    // Показываем backdrop
    if (mobileNavBackdrop) {
      mobileNavBackdrop.style.display = "block";
      // Небольшая задержка для плавной анимации
      setTimeout(() => {
        mobileNavBackdrop.style.opacity = "1";
      }, 10);
    }
    
    // Активируем мобильное меню
    mobileNav.classList.add("active");
    document.body.style.overflow = "hidden";
    
    // Добавляем эффект пульсации к кнопке
    navBtn.style.animation = "burgerPulse 0.6s ease-out";
  }
  
  function closeMobileMenu() {
    // Убираем класс с кнопки бургера
    navBtn.classList.remove("active");
    
    // Скрываем backdrop
    if (mobileNavBackdrop) {
      mobileNavBackdrop.style.opacity = "0";
      setTimeout(() => {
        mobileNavBackdrop.style.display = "none";
      }, 500);
    }
    
    // Деактивируем мобильное меню
    mobileNav.classList.remove("active");
    document.body.style.overflow = "";
    
    // Убираем анимацию
    navBtn.style.animation = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".intro__btn");
  const nextSection = document.querySelector(".problem");
  if (scrollBtn && nextSection) {
    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();
      nextSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const intro = document.querySelector(".intro");
  const introInner = document.querySelector(".intro__inner");
  const cloudLeft = document.querySelector(".cloud-left");
  const cloudRight = document.querySelector(".cloud-right");
  const cloudTop = document.querySelector(".cloud-top");
  let isAnimating = false;

  if (introInner) {
    introInner.addEventListener("click", function () {
      if (isAnimating) return;
      isAnimating = true;
      header.classList.remove("header--in");
      header.classList.add("header--out");
      if (cloudLeft) cloudLeft.classList.add("cloud--out");
      if (cloudRight) cloudRight.classList.add("cloud--out");

      intro.classList.add("intro--out");

      setTimeout(() => {
        intro.classList.add("intro--fade");
      }, 450);

      setTimeout(() => {
        header.classList.remove("header--out");
        header.classList.add("header--in", "header--bounce");
        intro.classList.remove("intro--out", "intro--fade");
        intro.classList.add("intro--bounce");
        if (cloudLeft) {
          cloudLeft.classList.remove("cloud--out");
          cloudLeft.classList.add("cloud--bounce");
        }
        if (cloudRight) {
          cloudRight.classList.remove("cloud--out");
          cloudRight.classList.add("cloud--bounce");
        }
        setTimeout(() => {
          header.classList.remove("header--bounce");
          intro.classList.remove("intro--bounce");
          if (cloudLeft) cloudLeft.classList.remove("cloud--bounce");
          if (cloudRight) cloudRight.classList.remove("cloud--bounce");
        }, 1700);
      }, 1600);

      introSwiper.slideTo(0, 0);

      setTimeout(() => {
        if (cloudLeft) cloudLeft.classList.add("cloud--slider-move");
        if (cloudRight) cloudRight.classList.add("cloud--slider-move");

        startAutoScrollToLastCenter(introSwiper, 0.7);
        setTimeout(() => {
          if (cloudLeft) cloudLeft.classList.remove("cloud--slider-move");
          if (cloudRight) cloudRight.classList.remove("cloud--slider-move");
          isAnimating = false;
        }, 10000);
      }, 5300);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const infoContent = document.querySelector(".info__content");
  const leftImg = document.querySelector(".info__bg-img--left");
  const rightImg = document.querySelector(".info__bg-img--right");
  const leftBlock = document.querySelector(".info__item--left");
  const centerBlock = document.querySelector(".info__item--center");
  const rightBlock = document.querySelector(".info__item--right");

  if (infoContent) {
    infoContent.addEventListener("click", function handler() {
      if (leftImg) leftImg.classList.add("animated");
      if (rightImg) rightImg.classList.add("animated");
      if (leftBlock) leftBlock.classList.add("animated");
      if (centerBlock) centerBlock.classList.add("animated");
      if (rightBlock) rightBlock.classList.add("animated");

      setTimeout(() => {
        if (leftImg) leftImg.classList.remove("animated");
        if (rightImg) rightImg.classList.remove("animated");
        if (leftBlock) leftBlock.classList.remove("animated");
        if (centerBlock) centerBlock.classList.remove("animated");
        if (rightBlock) rightBlock.classList.remove("animated");
      }, 900);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const copyEmailLink = document.querySelector("[data-copy-email]");
  if (copyEmailLink) {
    copyEmailLink.addEventListener("click", function (e) {
      e.preventDefault();
      const emailElem = copyEmailLink.querySelector(".footer__item-name");
      const email = emailElem ? emailElem.textContent.trim() : "info@hazelflow.xyz";
      // Копировать email в буфер обмена
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(function () {
          showCopyNotification();
        });
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          showCopyNotification();
        } catch (err) {}
        document.body.removeChild(textarea);
      }
    });
  }

  function showCopyNotification() {
    let notif = document.createElement("div");
    notif.textContent = "Email copied!";
    notif.style.position = "fixed";
    notif.style.bottom = "40px";
    notif.style.left = "50%";
    notif.style.transform = "translateX(-50%)";
    notif.style.background = "rgba(255,255,255,0.77)";
    notif.style.color = "#000";
    notif.style.padding = "12px 28px";
    notif.style.border = "1px solid #000";
    notif.style.borderRadius = "12px";
    notif.style.fontSize = "18px";
    notif.style.zIndex = "9999";
    notif.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
    notif.style.opacity = "0.5";
    notif.style.transition = "opacity 0.2s";
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = "1";
    }, 10);
    setTimeout(() => {
      notif.style.opacity = "0";
      setTimeout(() => document.body.removeChild(notif), 200);
    }, 1500);
  }
});
