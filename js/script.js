//!====== Burger Menu =========
document.addEventListener("DOMContentLoaded", function burgerMenu() {
  //!BURGER MENU
  const navBtn = document.querySelector(".nav-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;

  //Клик по кнопке
  navBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleMobilenav();
  });

  //Клик по окну за пределами навигации
  window.addEventListener("click", function () {
    if (body.classList.contains("no-scroll")) {
      toggleMobilenav();
    }
  });
  //останавливаем клик внутри открытой мобильной навигации
  mobileNav.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  function toggleMobilenav() {
    mobileNav.classList.toggle("mobile-nav-active");
    navBtn.classList.toggle("nav-btn-close");
    body.classList.toggle("no-scroll");
  }

  //!статичный хедер при скролле
  (function () {
    const header = document.querySelector(".header");
    window.onscroll = () => {
      if (window.pageYOffset > 400) {
        header.classList.add("header--active");
      } else {
        header.classList.remove("header--active");
      }
    };
  })();
});

// !=== Функция для обработки якорных ссылок ===
document.addEventListener("DOMContentLoaded", function () {
  function scrollToSection(event) {
    event.preventDefault();

    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  }

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });

  // Функция для обновления активного класса на ссылках при скролле
  function updateActiveLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".header__link");

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.clientHeight;

      // Если текущая секция видима на экране
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        navLinks.forEach((link) => {
          link.classList.remove("header__link--active");
        });
        navLinks[index].classList.add("header__link--active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);
});

//!======Cookies=========
document.addEventListener("DOMContentLoaded", function cookies() {
  const cookiesPopup = document.querySelector(".cookies");
  const okButton = document.querySelector("#btn-ok");
  const yesButton = document.querySelector("#btn-yes");

  const closeCookiesPopup = () => {
    cookiesPopup.style.display = "none";
  };

  okButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeCookiesPopup();
  });

  yesButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeCookiesPopup();
  });

  // Также добавляем обработчик события для .cookies для случаев, когда пользователь кликает вне кнопок
  cookiesPopup.addEventListener("click", (event) => {
    if (event.target === cookiesPopup) {
      closeCookiesPopup();
    }
  });
});


//======Swiper=========
const slider1 = document.getElementById("slider1");
const slides1 = slider1.querySelectorAll(".swiper-slide");
const slideCount1 = slides1.length;
const slideCountText1 = slideCount1 >= 10 ? slideCount1.toString() : `0${slideCount1}`;

const slider2 = document.getElementById("slider2");
const slides2 = slider2.querySelectorAll(".swiper-slide");
const slideCount2 = slides2.length;
const slideCountText2 = slideCount2 >= 10 ? slideCount2.toString() : `0${slideCount2}`;

function formatNumber(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function updateFraction(fractionElement, currentIndex, totalSlides) {
  fractionElement.innerHTML = `<span>${formatNumber(currentIndex)}</span> / <span>${totalSlides}</span>`;
}
// slider 1
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".benefits__slider", {
    loop: false,
    speed: 800,
    spaceBetween: 30,
    navigation: {
      nextEl: ".benefits__slider-next",
      prevEl: ".benefits__slider-prev",
    },
    pagination: {
      el: ".benefits__pagination-slider",
      clickable: true,
    },
    on: {
      init: (swiper) => {
        updateFraction(document.getElementById("fraction"), 1, slideCountText1);
      },
      slideChange: (swiper) => {
        const currentIndex = swiper.realIndex + 1;
        updateFraction(document.getElementById("fraction"), currentIndex, slideCountText1);
      },
    },
  });
});

// slider 2
document.addEventListener("DOMContentLoaded", function () {
  let featureSlider = new Swiper(".features__slider", {
    speed: 1500,
    navigation: {
      nextEl: ".features__slider-next",
      prevEl: ".features__slider-prev",
    },
    pagination: {
      el: ".features__pagination-slider",
      clickable: true,
    },
    on: {
      init: (swiper) => {
        updateFraction(document.getElementById("fraction2"), 1, slideCountText2);
      },
      slideChange: (swiper) => {
        const currentIndex = swiper.realIndex + 1;
        updateFraction(document.getElementById("fraction2"), currentIndex, slideCountText2);
      },
    },
  });

  function destroySwiperIfNecessary() {
    if (window.innerWidth < 620) {
      featureSlider.destroy();
    }
  }

  window.addEventListener("resize", destroySwiperIfNecessary);
  destroySwiperIfNecessary();
});

document.addEventListener("DOMContentLoaded", function accordions() {
  //!ACCORDION
  let accordion = new Accordion(".accordion-container", {
    duration: 600,
    ariaEnabled: true,
    collapse: true,
    showMultiple: false,
    openOnInit: [],
    elementClass: "ac",
    triggerClass: "ac-trigger",
    panelClass: "ac-panel",
    activeClass: "is-active",
  });

  accordion.open(0);
});

document.addEventListener("DOMContentLoaded", function dynamicAdapt() {
  function DynamicAdapt() {
    // Динамический адаптив
    function DynamicAdapt(type) {
      this.type = type;
    }
    DynamicAdapt.prototype.init = function () {
      const _this = this;
      // массив объектов
      this.оbjects = [];
      this.daClassname = "_dynamic_adapt_";
      // массив DOM-элементов
      this.nodes = document.querySelectorAll("[data-da]");
      // наполнение оbjects объктами
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
      }
      this.arraySort(this.оbjects);
      // массив уникальных медиа-запросов
      this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (item) {
          return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        },
        this
      );
      this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
      });
      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ",");
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];
        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
          return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
          _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
      }
    };
    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
      if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
      } else {
        //for (let i = 0; i < оbjects.length; i++) {
        for (let i = оbjects.length - 1; i >= 0; i--) {
          const оbject = оbjects[i];
          if (оbject.element.classList.contains(this.daClassname)) {
            this.moveBack(оbject.parent, оbject.element, оbject.index);
          }
        }
      }
    };
    // Функция перемещения
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === "last" || place >= destination.children.length) {
        destination.insertAdjacentElement("beforeend", element);
        return;
      }
      if (place === "first") {
        destination.insertAdjacentElement("afterbegin", element);
        return;
      }
      destination.children[place].insertAdjacentElement("beforebegin", element);
    };
    // Функция возврата
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement("beforebegin", element);
      } else {
        parent.insertAdjacentElement("beforeend", element);
      }
    };
    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
      const array = Array.prototype.slice.call(parent.children);
      return Array.prototype.indexOf.call(array, element);
    };
    // Функция сортировки массива по breakpoint и place
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
      if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === "first" || b.place === "last") {
              return -1;
            }

            if (a.place === "last" || b.place === "first") {
              return 1;
            }

            return a.place - b.place;
          }

          return a.breakpoint - b.breakpoint;
        });
      } else {
        Array.prototype.sort.call(arr, function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === "first" || b.place === "last") {
              return 1;
            }

            if (a.place === "last" || b.place === "first") {
              return -1;
            }

            return b.place - a.place;
          }

          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    };
    const da = new DynamicAdapt("max");
    da.init();

    const isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
      },
    };
  }

  DynamicAdapt();
});
document.addEventListener("DOMContentLoaded", function () {
  const fullscreenButton = document.getElementById("fullscreen-button");
  const videoPlayer = document.getElementById("video-player");

  function fullScreenVideo() {
    fullscreenButton.addEventListener("click", function () {
      if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen().then(() => {
          videoPlayer.play();
        });
      } else if (videoPlayer.mozRequestFullScreen) {
        videoPlayer.mozRequestFullScreen().then(() => {
          videoPlayer.play();
        });
      } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen().then(() => {
          videoPlayer.play();
        });
      }
    });

    document.addEventListener("fullscreenchange", function () {
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        videoPlayer.pause();
      }
    });
  }

  if (window.innerWidth <= 450) {
    videoPlayer.setAttribute('controls', 'controls');
  } else {
    fullScreenVideo();
  }
});
