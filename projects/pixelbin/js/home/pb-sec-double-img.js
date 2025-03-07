// Section 6 _ DOUBLE IMAGE SWIPERS

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
      direction: "vertical",
    },
    0: {
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

// Data for text updates
const tabData = {
  1: { left: "Photo enhancement", right: "Object clean up" },
  2: { left: "Instant shadows", right: "Custom backgrounds" },
  3: { left: "Batch editing", right: "Flawless photography" },
  4: { left: "Creative tools", right: "AI enhancements" },
  5: { left: "Vivid colors", right: "Quick edits" },
};

// Function to update domain tags
function updateDomainTags(tabIndex) {
  const tabInfo = tabData[tabIndex];
  if (tabInfo) {
    document.querySelector("[data-domain-tag-left]").textContent = tabInfo.left;
    document.querySelector("[data-domain-tag-right]").textContent =
      tabInfo.right;
  }
}

// Function to update images with fade effect and sync text updates
function updateActiveImages() {
  const activeTab = document.querySelector(
    window.matchMedia("(max-width: 767px)").matches
      ? ".swiper-slide.for-domains.active"
      : ".swiper-slide.for-domains.w--current"
  );

  if (activeTab) {
    const activeIndex = [...tabs].indexOf(activeTab);

    imagesOuter.forEach((image, index) => {
      gsap.to(image, {
        opacity: index === activeIndex ? 1 : 0,
        duration: 0.6,
        ease: "power2.out",
        display: index === activeIndex ? "block" : "none",
      });
    });

    imagesInner.forEach((image, index) => {
      gsap.to(image, {
        opacity: index === activeIndex ? 1 : 0,
        duration: 0.6,
        ease: "power2.out",
        display: index === activeIndex ? "block" : "none",
      });
    });

    // Update the domain tags based on the active index
    updateDomainTags(activeIndex + 1);
  }
}

// Observe changes to the tabs
const observer = new MutationObserver(() => {
  updateActiveImages();
});

// Start observing the tabs for class changes
tabs.forEach((tab) =>
  observer.observe(tab, { attributes: true, attributeFilter: ["class"] })
);

// Function to update the active tab based on the active slide
function updateTabBasedOnSlide() {
  const activeSlideIndex = swiperImage.realIndex;

  tabs.forEach((tab, index) => {
    if (index === activeSlideIndex) {
      tab.classList.add("active", "w--current");
    } else {
      tab.classList.remove("active", "w--current");
    }
  });

  // Ensure images and text update correctly
  updateActiveImages();
}

// Function to update the active slide when a tab is clicked
function updateSlideBasedOnTab() {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      swiperImage.slideTo(index);
      updateTabBasedOnSlide();
    });
  });
}

// Sync active tab and update text when Swiper slide changes (for touch gestures)
swiperImage.on("slideChange", () => {
  updateTabBasedOnSlide();
  const activeSlideIndex = swiperImage.realIndex + 1; // Adjusting for zero-based index
  updateDomainTags(activeSlideIndex);
  updateActiveImages(); // Ensure images and text update on slide change
});

// Update domain tags when a tab is clicked
document.querySelectorAll("[pb-home-tablink]").forEach((tabLink) => {
  tabLink.addEventListener("click", () => {
    const selectedTab = tabLink.getAttribute("pb-home-tablink");
    updateDomainTags(parseInt(selectedTab, 10));
  });
});

// Initial load sync
updateActiveImages();
