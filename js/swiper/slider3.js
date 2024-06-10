// ----- Swiper slider configuration for Tiny but mighty updates -----
const swipertbm = new Swiper('[data-swiper="slider3"]', {
  speed: 300,
  autoHeight: true,
  followFinger: true,
  slideToClickedSlide: false,
  slidesPerView: 1,
  spaceBetween: 32,
  //loop: true,
  mousewheel: {
    forceToAxis: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  noSwipingSelector: "a",
  navigation: {
    nextEl: '[data-swiper-button="next"]',
    prevEl: '[data-swiper-button="prev"]',
  },

  breakpoints: {
    // mobile landscape
    480: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    // tablet
    768: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
    // desktop
    992: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
});
