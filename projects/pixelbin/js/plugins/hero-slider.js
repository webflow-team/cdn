const swipertbm = new Swiper('[data-swiper="slider3"]', {
  speed: 300,
  autoHeight: true,
  followFinger: true,
  slideToClickedSlide: false,
  slidesPerView: "auto",
  spaceBetween: 16, // Set the gap between slides (20px in this example)
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
  pagination: {
    el: ".plugins_swiper_pagination",
    clickable: true,
    bulletClass: "plugins_swiper_pagination_dot",
    bulletActiveClass: "is-active",
    renderBullet: function (index, className) {
      return `<div class="${className}"></div>`;
    },
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
});
