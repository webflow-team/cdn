document.addEventListener("DOMContentLoaded", function () {
  const ACCORDION_SELECTOR = '[ff-accordion-element="toc-accordion"]';
  const TRIGGER_SELECTOR = '[ff-accordion-element="trigger"]';
  const CONTENT_SELECTOR = '[ff-accordion-element="content"]';
  const ARROW_SELECTOR = '[ff-accordion-element="arrow"]';
  const TOC_LINK_SELECTOR = '[ff-accordian-element="link"]';
  const BREAKPOINT = 1024;

  function isTabletOrBelow() {
    return window.innerWidth <= BREAKPOINT;
  }

  function toggleAccordion(trigger, content, arrow) {
    const isOpen = content.style.display === "block";

    content.style.display = isOpen ? "none" : "block";
    arrow?.classList.toggle("is-active-accordian", !isOpen);

    if (!isOpen) {
      initializeTocLinks(content);
    }
  }

  function initializeTocLinks(content) {
    content.querySelectorAll(TOC_LINK_SELECTOR).forEach((link) => {
      link.addEventListener("click", function () {
        if (!isTabletOrBelow()) return;
        content.style.display = "none";
        content
          .closest(ACCORDION_SELECTOR)
          .querySelector(ARROW_SELECTOR)
          ?.classList.remove("is-active-accordian");
      });
    });
  }

  function setupAccordion() {
    document.querySelectorAll(ACCORDION_SELECTOR).forEach((accordion) => {
      const trigger = accordion.querySelector(TRIGGER_SELECTOR);
      const content = accordion.querySelector(CONTENT_SELECTOR);
      const arrow = accordion.querySelector(ARROW_SELECTOR);

      if (trigger && content) {
        trigger.addEventListener("click", function () {
          if (!isTabletOrBelow()) return;
          toggleAccordion(trigger, content, arrow);
        });
      }
    });
  }

  function resetAccordions() {
    document.querySelectorAll(CONTENT_SELECTOR).forEach((content) => {
      content.style.display = isTabletOrBelow() ? "none" : "block";
    });

    document.querySelectorAll(ARROW_SELECTOR).forEach((arrow) => {
      arrow.classList.remove("is-active-accordian");
    });
  }

  function handleResize() {
    resetAccordions();
  }

  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  });

  setupAccordion();
  handleResize();
});
