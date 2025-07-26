"use strict";

// Swiper configurations
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

// Utility functions
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

function showCopyNotification() {
  const notif = document.createElement("div");
  notif.textContent = "Email copied!";
  notif.style.cssText = `
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.77);
    color: #000;
    padding: 12px 28px;
    border: 1px solid #000;
    border-radius: 12px;
    font-size: 18px;
    z-index: 9999;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    opacity: 0.5;
    transition: opacity 0.2s;
  `;
  
  document.body.appendChild(notif);
  
  setTimeout(() => notif.style.opacity = "1", 10);
  setTimeout(() => {
    notif.style.opacity = "0";
    setTimeout(() => document.body.removeChild(notif), 200);
  }, 1500);
}

// Main initialization
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const elements = {
    scrollBtn: document.querySelector(".intro__btn"),
    nextSection: document.querySelector(".problem"),
    header: document.querySelector(".header"),
    intro: document.querySelector(".intro"),
    introInner: document.querySelector(".intro__inner"),
    clouds: {
      left: document.querySelector(".cloud-left"),
      right: document.querySelector(".cloud-right"),
      top: document.querySelector(".cloud-top")
    },
    infoContent: document.querySelector(".info__content"),
    infoElements: {
      leftImg: document.querySelector(".info__bg-img--left"),
      rightImg: document.querySelector(".info__bg-img--right"),
      leftBlock: document.querySelector(".info__item--left"),
      centerBlock: document.querySelector(".info__item--center"),
      rightBlock: document.querySelector(".info__item--right")
    },
    copyEmailLink: document.querySelector("[data-copy-email]"),
    navBtn: document.querySelector(".nav-btn"),
    mobileNav: document.querySelector(".mobile-nav"),
    mobileNavBackdrop: document.querySelector(".mobile-nav-backdrop"),
    mobileNavClose: document.querySelector(".mobile-nav__close")
  };

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faqs__item");
  faqItems.forEach((item) => {
    const text = item.querySelector(".faqs__item-text");
    
    text.addEventListener("transitionend", (e) => {
      if (e.propertyName === "max-height") {
        if (item.classList.contains("faqs__item--active")) {
          text.style.maxHeight = "none";
        } else {
          text.style.maxHeight = "0px";
        }
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
      
      // Close other items
      faqItems.forEach((i) => {
        if (i !== item) {
          i.classList.remove("faqs__item--active");
          const t = i.querySelector(".faqs__item-text");
          t.style.maxHeight = t.scrollHeight + "px";
          t.offsetHeight;
          t.style.maxHeight = "0px";
        }
      });
      
      // Open current item
      item.classList.add("faqs__item--active");
      text.style.maxHeight = "0px";
      setTimeout(() => {
        text.style.maxHeight = text.scrollHeight + "px";
      }, 15);
    });
  });

  // Scroll button
  if (elements.scrollBtn && elements.nextSection) {
    elements.scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();
      elements.nextSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Intro animation
  if (elements.introInner) {
    let isAnimating = false;
    
    elements.introInner.addEventListener("click", function () {
      if (isAnimating) return;
      isAnimating = true;
      
      // Start animation
      elements.header.classList.remove("header--in");
      elements.header.classList.add("header--out");
      
      Object.values(elements.clouds).forEach(cloud => {
        if (cloud) cloud.classList.add("cloud--out");
      });
      
      elements.intro.classList.add("intro--out");

      setTimeout(() => {
        elements.intro.classList.add("intro--fade");
      }, 450);

      // Reset animation
      setTimeout(() => {
        elements.header.classList.remove("header--out");
        elements.header.classList.add("header--in", "header--bounce");
        elements.intro.classList.remove("intro--out", "intro--fade");
        elements.intro.classList.add("intro--bounce");
        
        Object.values(elements.clouds).forEach(cloud => {
          if (cloud) cloud.classList.remove("cloud--out");
        });
        
        setTimeout(() => {
          elements.header.classList.remove("header--bounce");
          elements.intro.classList.remove("intro--bounce");
        }, 1700);
      }, 1600);

      introSwiper.slideTo(0, 0);

      // Slider animation
      setTimeout(() => {
        if (elements.clouds.left) elements.clouds.left.classList.add("cloud--slider-move");
        if (elements.clouds.right) elements.clouds.right.classList.add("cloud--slider-move");

        startAutoScrollToLastCenter(introSwiper, 0.7);
        
        setTimeout(() => {
          if (elements.clouds.left) elements.clouds.left.classList.remove("cloud--slider-move");
          if (elements.clouds.right) elements.clouds.right.classList.remove("cloud--slider-move");
          isAnimating = false;
        }, 10000);
      }, 5300);
    });
  }

  // Info section animation
  if (elements.infoContent) {
    elements.infoContent.addEventListener("click", function handler() {
      Object.values(elements.infoElements).forEach(el => {
        if (el) el.classList.add("animated");
      });

      setTimeout(() => {
        Object.values(elements.infoElements).forEach(el => {
          if (el) el.classList.remove("animated");
        });
      }, 900);
    });
  }

  // Copy email functionality
  if (elements.copyEmailLink) {
    elements.copyEmailLink.addEventListener("click", function (e) {
      e.preventDefault();
      const emailElem = elements.copyEmailLink.querySelector(".footer__item-name");
      const email = emailElem ? emailElem.textContent.trim() : "info@hazelflow.xyz";
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(showCopyNotification);
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

  // Mobile menu
  if (elements.navBtn && elements.mobileNav) {
    function toggleMobileMenu() {
      const isActive = elements.mobileNav.classList.contains("active");
      isActive ? closeMobileMenu() : openMobileMenu();
    }
    
    function openMobileMenu() {
      elements.navBtn.classList.add("active");
      
      if (elements.mobileNavBackdrop) {
        elements.mobileNavBackdrop.style.display = "block";
        elements.mobileNavBackdrop.classList.add("active");
        setTimeout(() => {
          elements.mobileNavBackdrop.style.opacity = "1";
        }, 10);
      }
      
      elements.mobileNav.classList.add("active");
      document.body.style.overflow = "hidden";
      elements.navBtn.style.animation = "burgerPulse 0.6s ease-out";
    }
    
    function closeMobileMenu() {
      elements.navBtn.classList.remove("active");
      
      if (elements.mobileNavBackdrop) {
        elements.mobileNavBackdrop.style.opacity = "0";
        elements.mobileNavBackdrop.classList.remove("active");
        setTimeout(() => {
          elements.mobileNavBackdrop.style.display = "none";
        }, 500);
      }
      
      elements.mobileNav.classList.remove("active");
      document.body.style.overflow = "";
      elements.navBtn.style.animation = "";
    }
    
    // Event listeners
    elements.navBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
    
    document.addEventListener("click", function (e) {
      if (elements.mobileNav.classList.contains("active")) {
        if (!elements.mobileNav.contains(e.target) && !elements.navBtn.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });
    
    elements.mobileNav.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("click", closeMobileMenu);
    });
    
    if (elements.mobileNavBackdrop) {
      elements.mobileNavBackdrop.addEventListener("click", closeMobileMenu);
    }
    
    if (elements.mobileNavClose) {
      elements.mobileNavClose.addEventListener("click", closeMobileMenu);
    }
  }
});
