//Section 4 _ IMAGE SWIPERS

const swiperImage = new Swiper("#double-img-swiper", {
  speed: 600,
  loop: false,
  spaceBetween: 0,
  autoHeight: false,
  followFinger: true,
  centeredSlides: false,
  freeMode: false,
  slideToClickedSlide: true,
  breakpoints: {
    768: {
      // For viewports 992px and above
      direction: "vertical",
    },
    0: {
      // For viewports below 992px
      direction: "horizontal",
      spaceBetween: 12,
    },
  },
  slidesPerView: "auto",
});

// Select all tabs and images
const tabs = document.querySelectorAll(".swiper-slide.for-domains");
const imagesOuter = document.querySelectorAll(
  "#outer-img-wrapper .home-tabs_img"
);
const imagesInner = document.querySelectorAll(
  "#inner-img-wrapper .home-domains_inner-img"
);

// Function to update the active state
function updateActiveImages() {
  // Find the currently active tab
  const activeTab = document.querySelector(
    ".swiper-slide.for-domains.w--current"
  );

  if (activeTab) {
    // Get the index of the active tab
    const activeIndex = [...tabs].indexOf(activeTab);

    // Loop through images and update their active state
    imagesOuter.forEach((image, index) => {
      if (index < activeIndex) {
        image.classList.add("active");
        image.classList.add("blur");
      } else if (index === activeIndex) {
        image.classList.add("active");
        image.classList.remove("blur");
      } else {
        image.classList.remove("active");
        image.classList.remove("blur");
      }
    });

    // Loop through images and update their active state
    imagesInner.forEach((image, index) => {
      if (index < activeIndex) {
        image.classList.add("active");
        image.classList.add("blur");
      } else if (index === activeIndex) {
        image.classList.add("active");
        image.classList.remove("blur");
      } else {
        image.classList.remove("active");
        image.classList.remove("blur");
      }
    });
  }
}

// Observe changes to the tabs
const observer = new MutationObserver(() => {
  updateActiveImages();
});

// Start observing the tabs for changes in their `class` attribute
tabs.forEach((tab) =>
  observer.observe(tab, { attributes: true, attributeFilter: ["class"] })
);

// Initial state setup
updateActiveImages();

// Function to update the active tab based on the active slide
function updateTabBasedOnSlide() {
  const activeSlideIndex = swiperImage.activeIndex;
  tabs.forEach((tab, index) => {
    if (index === activeSlideIndex) {
      tab.classList.add("active"); // Webflow's active class
    } else {
      tab.classList.remove("active");
    }
  });
}

// Function to update the active slide based on the active tab
function updateSlideBasedOnTab() {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      swiperImage.slideTo(index); // Move Swiper to the corresponding slide
    });
  });
}

// Sync active tab when the Swiper slide changes
swiperImage.on("slideChange", updateTabBasedOnSlide);

// Sync Swiper when a tab is clicked
updateSlideBasedOnTab();
