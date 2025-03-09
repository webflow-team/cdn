// Register the ScrollTrigger and FLIP plugin
gsap.registerPlugin(ScrollTrigger, Flip);

// NAV ELEMENTS
const nav = document.querySelector("[el=nav-component]");
const navInner = document.querySelector("[el=nav-inner-wrapper]");
const logo = document.querySelector("[el=logo-wrapper]");
const logoText = document.querySelector("[el=logo-text]");
const firstCta = document.querySelector("[el=first-cta]");
const bgShape = document.querySelector("[el=nav-bg-shape]");

// ---------------------------------------------------------------------------

// GSAP timeline for Nav animation
const navShrink = gsap.timeline({ paused: true });

// ------------------------------

// Store the natural auto width by temporarily setting the width to auto
gsap.set(navInner, { width: "auto" });
const autoWidth = navInner.offsetWidth; // Get the natural auto width

// Add 1.5rem to the captured auto width
const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize); // Get 1em in pixels
const addedWidth = autoWidth + 1.5 * remToPx; // Add 2em in pixels to the auto width

// Set the width back to 100% before animating
gsap.set(navInner, { width: "100%" });

const animDur = 0.8;
let easeCustom = "power3.inOut";

// -------------------------------

// NAV SHRINKING TIMELINE
navShrink
  .to(
    nav,
    {
      borderBottomColor: "transparent", // Change to transparent
      duration: 0.2,
      ease: "power1.out",
    },
    "0"
  )
  .to(
    navInner,
    {
      borderRadius: "100vw", // Animate border-radius to 100vw
      padding: "0rem 0.75rem 0rem 1.5rem", // Animate padding on all sides to 0.25em
      duration: animDur, // Animation duration
      ease: easeCustom,
    },
    "0"
  )
  .to(
    navInner,
    {
      width: addedWidth, // Animate width from 100% to auto width;
      duration: animDur,
      ease: easeCustom,
    },
    "0"
  )
  .to(
    bgShape,
    {
      borderRadius: "100vw", // Animate border-radius to 100vw
      width: addedWidth, // Animate width from 100% to auto width;
      duration: animDur,
      ease: easeCustom,
    },
    "0"
  )
  .to(
    logo,
    {
      width: "1.875rem", // Animate width
      x: "0rem",
      duration: animDur,
      ease: easeCustom,
    },
    "0"
  )
  .to(
    logoText,
    {
      opacity: 0, // Animate width from 100% to auto width;
      duration: 0.3,
      ease: "power1.out",
    },
    "0.2"
  )
  .to(
    firstCta,
    {
      backgroundColor: "var(--_button-style---background)",
      color: "white",
      duration: 0.6,
      ease: "power1.out",
      onComplete: () => {
        // Add the 'hover-state' class once animation is complete
        firstCta.classList.add("first-cta-hover");
      },
      onReverseComplete: () => {
        // Add the 'hover-state' class once animation is complete
        firstCta.classList.remove("first-cta-hover");
      },
    },
    "0.4"
  )
  .fromTo(
    nav,
    {
      y: "0rem",
    },
    {
      y: "0.5rem",
      duration: 0.6,
      ease: "power2.inOut",
    },
    "0.2"
  )
  .to(
    bgShape,
    {
      duration: 0.5, // Duration of the animation in seconds
      backdropFilter: "blur(6px)",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderColor: "#F5F5F5",
      boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.05)",
      ease: "power1.inOut", // Smooth easing for the animation
    },
    "0.4"
  );

// ---------------------------------------------------------------------------

// PLAYING THE TIMELINE ON DESKTOP

ScrollTrigger.matchMedia({
  // Desktop and tablet breakpoints (above 768px)
  "(min-width: 991px)": function () {
    ScrollTrigger.create({
      trigger: "#home-hero", // The hero section as the trigger
      start: "bottom 5%", // Start animation when the bottom of the hero section hits the top of the viewport
      onEnter: () => navShrink.timeScale(1).play(), // Play the navshrink animation when scrolling past the hero
      onLeaveBack: () => navShrink.timeScale(1.125).reverse(), // Reverse the animation when scrolling back into the hero section
    });
  },
  // You can add more breakpoints if needed
});

//------------------------------------------------------------------------------

// NAV HOVER ANIMATIONS - ONLY FOR DESKTOP

if (window.matchMedia("(min-width: 1025px)").matches) {
  // NAV LINKS -->  HOVER IN - SIBLING STYLES
  document
    .querySelectorAll(".nav_dropdown-component, .nav_menu-link")
    .forEach((item) => {
      item.addEventListener("mouseenter", () => {
        // Add subdued color to all siblings
        document
          .querySelectorAll(".nav_dropdown-component, .nav_menu-link")
          .forEach((sibling) => {
            if (sibling !== item) {
              sibling.style.color = "var(--text-color--text-body)";
            }
          });
      });

      item.addEventListener("mouseleave", () => {
        // Reset all siblings' color
        document
          .querySelectorAll(".nav_dropdown-component, .nav_menu-link")
          .forEach((sibling) => {
            sibling.style.color = ""; // Reset to default color
          });
      });
    });

  // ---------------------------------------------------------------------------

  // NAV DROPDOWN --> HOVER-IN DESKTOP

  document.querySelectorAll('[el="nav-dropdown"]').forEach((dropdown) => {
    const toggle = dropdown.querySelector('[el="dropdown-toggle"]');
    const list = dropdown.querySelector('[el="dropdown-list"]');
    const listContent = dropdown.querySelector('[el="dropdown-list-content"]');
    const columns = listContent.querySelectorAll(".nav_column");
    const largeLinks = listContent.querySelectorAll(".nav_dropdown-link-large");
    const rightCard = listContent.querySelector('[el="right-card"]');

    // Create a GSAP timeline for the dropdown
    const navDropdownTl = gsap
      .timeline({ paused: true, reversed: true })
      .fromTo(
        listContent,
        {
          opacity: 0,
          y: "1rem",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }
      );

    // Animate the nav_column elements with stagger if present
    if (columns.length > 0) {
      navDropdownTl.fromTo(
        columns,
        {
          opacity: 0,
          scale: 0.99,
          y: "0.25rem",
        },
        {
          opacity: 1,
          scale: 1,
          y: "0rem",
          duration: 0.3,
          ease: "ease.Out", // Different ease for opacity
          stagger: 0.05, // Stagger animation
        },
        "0.1"
      ); // Start this animation concurrently with the dropdown content
    }

    // Animate the product links with stagger if present
    if (largeLinks.length > 0) {
      navDropdownTl.fromTo(
        largeLinks,
        {
          opacity: 0,
          scale: 0.99,
          y: "0.25rem",
        },
        {
          opacity: 1,
          scale: 1,
          y: "0rem",
          duration: 0.2,
          ease: "power1.Out", // Different ease for opacity
          stagger: 0.03, // Stagger animation
        },
        "0.05"
      ); // Start this animation concurrently with the dropdown content
    }

    // Animate the right card if present
    if (rightCard) {
      navDropdownTl.fromTo(
        rightCard,
        {
          opacity: 0,
          scale: 0.96,
          y: "0.5rem",
        },
        {
          opacity: 1,
          scale: 1,
          y: "0rem",
          duration: 0.3,
          ease: "ease.out", // Different ease for opacity
        },
        "-=0.3"
      ); // Start this animation concurrently with the dropdown content
    }

    // -----------------------------------------

    // Add EVENT LISTENERS to manage animations on hover
    toggle.addEventListener("mouseenter", () => {
      if (toggle.classList.contains("w--open")) {
        navDropdownTl.restart(); // Play the animation when opened
      }
    });

    toggle.addEventListener("mouseleave", () => {
      if (!toggle.classList.contains("w--open")) {
        navDropdownTl.timeScale(1.5).reverse(); // Reverse the animation with 1.5x speed
      }
    });
  });
}

// -----------------------------------------

// For MOBILE NAV LINKS - for preventing double click
if (window.matchMedia("(max-width: 1024px)").matches) {
  document
    .querySelectorAll(".nav_dropdown-mobile-header-text-wrapper")
    .forEach((wrapper) => {
      wrapper.addEventListener("click", () => {
        const dropdownToggle = wrapper
          .closest(".nav_dropdown-component")
          .querySelector(".nav_dropdown-toggle");
        if (dropdownToggle) {
          dropdownToggle.click(); // Programmatically trigger a click
        }
      });
    });
}

// -----------------------------------------
