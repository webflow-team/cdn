// Initialize Swiper for Content
//testr
const swiperContent = new Swiper("#tab-content-swiper", {
  speed: 600,
  loop: false,
  spaceBetween: 0,
  autoHeight: false,
  centeredSlides: true,
  autoplay: {
    disableOnInteraction: false,
    pauseOnMouseEnter: true, // Pause Swiper on hover
  },
  followFinger: true,
  freeMode: false,
  slidesPerView: "auto",
  mousewheel: {
    forceToAxis: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  slideActiveClass: "is-active",
  slideDuplicateActiveClass: "is-active",
});

// Initialize Swiper for Menu
const swiperMenu = new Swiper("#tab-menu-swiper", {
  speed: 600,
  loop: false,
  spaceBetween: 0,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoHeight: false,
  followFinger: true,
  freeMode: true,
  slideToClickedSlide: true,
  slidesPerView: "auto",
});

// Disable autoplay initially
swiperContent.autoplay.stop();

// START AUTOPLAYING AFTER IT COMES IN VIEW
new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    observer.disconnect();
    swiperContent.autoplay.start();
    startProgressBar();
  }
}).observe(document.querySelector("#features-tab"));

// Syncing logic for slide change
swiperContent.on("slideChange", () => {
  const activeIndex = swiperContent.activeIndex;

  // Remove "active" class from all swiperMenu slides
  swiperMenu.slides.forEach((slide) => slide.classList.remove("is-active"));

  // Add "active" class to the corresponding swiperMenu slide
  const correspondingSlide = swiperMenu.slides[activeIndex];
  if (correspondingSlide) {
    correspondingSlide.classList.add("is-active");
    swiperMenu.slideTo(activeIndex); // Sync swiperMenu to swiperContent
  }

  // Reset and start progress bar for the active slide
  resetProgressBar();
  startProgressBar();
});

// Optional: Clicking a swiperMenu slide updates swiperContent
swiperMenu.on("click", (swiper) => {
  const clickedIndex = swiper.clickedIndex;
  if (clickedIndex !== undefined && clickedIndex !== null) {
    swiperContent.slideTo(clickedIndex);
  }
});

// Add pause on hover for swiperContent
const swiperContainer = document.getElementById("tab-content-swiper");

swiperContainer.addEventListener("mouseenter", () => {
  swiperContent.autoplay.stop();
  pauseProgressBar();
  console.log("Swiper paused");
});

swiperContainer.addEventListener("mouseleave", () => {
  swiperContent.autoplay.start();
  resumeProgressBar();
  console.log("Swiper resumed");
});

// Progress Bar Controls
let remainingTime = 5000; // Default delay time (5 seconds)
let startTime = null;

function startProgressBar() {
  const progressBar = document.querySelector(
    ".swiper-slide.is-active .home-features_tab-menu-progress"
  );
  if (progressBar) {
    progressBar.style.width = "0%";
    progressBar.style.transition = `width ${remainingTime}ms linear`;
    progressBar.offsetWidth; // Trigger reflow
    progressBar.style.width = "100%";
    startTime = new Date().getTime(); // Set the start time for the progress
  }
}

function resetProgressBar() {
  const allProgressBars = document.querySelectorAll(
    ".home-features_tab-menu-progress"
  );
  allProgressBars.forEach((bar) => {
    bar.style.width = "0%";
    bar.style.transition = "none";
  });
  remainingTime = 5000; // Reset the timer on slide change
}

function pauseProgressBar() {
  const progressBar = document.querySelector(
    ".swiper-slide.is-active .home-features_tab-menu-progress"
  );
  if (progressBar) {
    const elapsedTime = new Date().getTime() - startTime;
    remainingTime = Math.max(0, remainingTime - elapsedTime);

    const computedStyle = window.getComputedStyle(progressBar);
    const currentWidth = computedStyle.getPropertyValue("width");
    progressBar.style.width = currentWidth;
    progressBar.style.transition = "none";
  }
}

function resumeProgressBar() {
  const progressBar = document.querySelector(
    ".swiper-slide.is-active .home-features_tab-menu-progress"
  );
  if (progressBar) {
    const computedStyle = window.getComputedStyle(progressBar);
    const currentWidth = parseFloat(computedStyle.getPropertyValue("width"));
    const parentWidth = progressBar.parentElement.offsetWidth;

    if (remainingTime > 0) {
      progressBar.style.transition = `width ${remainingTime}ms linear`;
      progressBar.style.width = "100%";
      startTime = new Date().getTime(); // Reset start time for accurate pause calculation
    }
  }
}
