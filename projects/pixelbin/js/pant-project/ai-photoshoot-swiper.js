const swipertbm = new Swiper('[data-swiper="slider3"]', {
  speed: 500,
  autoHeight: true,
  followFinger: true,
  slideToClickedSlide: false,
  slidesPerView: "auto",
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  mousewheel: {
    forceToAxis: true,
    releaseOnEdges: true, // Allows scrolling past Swiper naturally
    sensitivity: 1, // Adjust if needed
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
  passiveListeners: false, // Helps fix scrolling issues on Safari
});
