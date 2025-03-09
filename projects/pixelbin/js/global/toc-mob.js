document.addEventListener("DOMContentLoaded", function () {
  const ACCORDION_SELECTOR = '[ff-accordion-element="toc-accordion"]';
  const TRIGGER_SELECTOR = '[ff-accordion-element="trigger"]';
  const CONTENT_SELECTOR = '[ff-accordion-element="content"]';
  const ARROW_SELECTOR = '[ff-accordion-element="arrow"]';
  const BREAKPOINT = 1024; // Tablet and below

  function isTabletOrBelow() {
    return window.innerWidth <= BREAKPOINT;
  }

  function toggleAccordion(trigger, content, arrow) {
    const isOpen = content.style.display === "block";

    if (isOpen) {
      content.style.display = "none";
      arrow?.classList.remove("is-active-accordian");
    } else {
      content.style.display = "block";
      arrow?.classList.add("is-active-accordian");
    }
  }

  function setupAccordion() {
    const accordions = document.querySelectorAll(ACCORDION_SELECTOR);

    accordions.forEach((accordion) => {
      const trigger = accordion.querySelector(TRIGGER_SELECTOR);
      const content = accordion.querySelector(CONTENT_SELECTOR);
      const arrow = accordion.querySelector(ARROW_SELECTOR);

      if (trigger && content) {
        trigger.addEventListener("click", function () {
          if (!isTabletOrBelow()) return;
          toggleAccordion(trigger, content, arrow);
        });

        // Add event listener to close the accordion when a link is clicked
        content.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", function () {
            if (!isTabletOrBelow()) return;
            content.style.display = "none";
            arrow?.classList.remove("is-active-accordian");
          });
        });
      }
    });
  }

  function resetAccordions() {
    document.querySelectorAll(CONTENT_SELECTOR).forEach((content) => {
      if (isTabletOrBelow()) {
        content.style.display = "none";
      } else {
        content.style.display = "block"; // Ensure content is visible on desktop
      }
    });
    document.querySelectorAll(ARROW_SELECTOR).forEach((arrow) => {
      arrow.classList.remove("is-active-accordian");
    });
  }

  function handleResize() {
    resetAccordions();
  }

  // Debounce function to limit the rate of handleResize calls
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  });

  setupAccordion();
  handleResize(); // Initial check on page load
});
