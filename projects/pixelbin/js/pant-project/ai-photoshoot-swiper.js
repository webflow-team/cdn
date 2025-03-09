const swipertbm = new Swiper('[data-swiper="slider3"]', {
  speed: 500,
  autoHeight: true,
  followFinger: true,
  slideToClickedSlide: false,
  slidesPerView: "auto",
  autoplay: {
    delay: 3000, // Adjust delay as needed
    disableOnInteraction: false,
    pauseOnMouseEnter: true, // Pauses autoplay when hovered
  },
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
});
