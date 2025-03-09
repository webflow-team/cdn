console.log("script loaded from CodeSandbox!");

// Register the ScrollTrigger and FLIP plugin
gsap.registerPlugin(ScrollTrigger, Flip);
// ScrollTrigger.normalizeScroll(true);

//------------------------------------------------------------------------------
//ONLY FOR DESKTOP
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

    // Add event listeners to manage animations on hover
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
          console.log("back clicked");
        }
      });
    });
}

//------------------------------------------------------------------------------

//SECTION 6 TABS DOUBLE IMG PARALLAX

// Create a GSAP timeline for all the animations
const parallaxTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#domain-section", // Trigger the animation when #domain-section comes into view
    start: "top bottom", // Start when the top of the section is at the bottom of the viewport
    end: "bottom top", // End when the bottom of the section reaches the top of the viewport
    scrub: true, // Synchronize with scroll
    markers: false, // Optional: Show markers for debugging
  },
});

// Add the animations to the timeline
parallaxTl
  .fromTo(
    "#outer-img-wrapper",
    {
      y: "0%", // Move from y:10% to y:-10%
    },
    {
      y: "-6%", // Move from y:10% to y:-10%
    }
  )
  .fromTo(
    "#inner-img-wrapper",
    {
      y: "2%", // Move from y:10% to y:-10%
    },
    {
      y: "-2%", // Move from y:10% to y:-10%
    },
    "<"
  )
  .to(
    "#domain-tag-left",
    {
      y: "-2rem", // Move left tag by 20%
    },
    "<"
  ) // Use "<" to ensure this starts at the same time as the previous animation
  .to(
    "#domain-tag-right",
    {
      y: "3rem", // Move right tag by -20%
    },
    "<"
  ); // Same as above to sync the animations

//------------------------------------------------------------------------------

//SECTION 5 TOOL CARDS HOVER ANIM

// Select all the cards
const cards = document.querySelectorAll(".home-tools_card");

cards.forEach((card) => {
  const mediaEmbed = card.querySelector(".home-tools_card-media-embed");
  const wrapper = card.querySelector(".home-tools_card-media-wrapper");
  const nameWrapper = card.querySelector(".home-tools_card-name");
  const overlay = card.querySelector(".home-tools_card-overlay");
  const video = card.querySelector(".tools-video");
  video.muted = true;

  let hoverInTimeline, hoverOutTimeline;

  card.addEventListener("mouseenter", () => {
    // Kill any ongoing hover-out timeline to prevent conflicts
    if (hoverOutTimeline) hoverOutTimeline.kill();
    video.play();

    // Record the initial state of the mediaEmbed
    const state = Flip.getState(mediaEmbed);

    // Move the embed inside the card without reflowing
    card.appendChild(mediaEmbed);

    // Create a timeline for hover-in
    hoverInTimeline = gsap.timeline();

    // Add the Flip animation to the timeline (animate with transform instead of reflowing the layout)
    hoverInTimeline.add(
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.out",
        absolute: true, // Set to absolute positioning to prevent reflow
      })
    );

    // Add the name wrapper animation to the timeline
    hoverInTimeline
      .to(
        nameWrapper,
        {
          y: "-1rem", // Move up by 1rem
          paddingLeft: "1rem", // Target value for padding-left
          paddingRight: "1rem",
          scale: 1.1,
          color: "white",
          duration: 0.4,
          ease: "power2.out",
        },
        0
      )
      .to(
        nameWrapper,
        {
          backgroundColor: "rgba(105,51,250,1)", // Background color animation
          duration: 0.3,
          ease: "ease.out",
        },
        0.1
      )
      .to(
        mediaEmbed,
        {
          borderRadius: "1rem", // Background color animation
          duration: 0.3,
          ease: "ease.out",
        },
        0
      )
      .to(
        overlay,
        {
          opacity: "1", // Background color animation
          duration: 0.3,
          ease: "ease.out",
        },
        0.15
      );
  });

  card.addEventListener("mouseleave", () => {
    // Kill any ongoing hover-in timeline to prevent conflicts
    if (hoverInTimeline) hoverInTimeline.kill();
    video.pause();
    video.currentTime = 0;

    // Record the initial state of the mediaEmbed
    const state = Flip.getState(mediaEmbed);

    // Move the embed back to the wrapper
    wrapper.appendChild(mediaEmbed);

    // Create a timeline for hover-out
    hoverOutTimeline = gsap.timeline();

    // Add the Flip animation to the timeline (animate with transform instead of reflowing the layout)
    hoverOutTimeline.add(
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.out",
        absolute: true, // Set to absolute positioning to prevent reflow
      })
    );

    // Add the name wrapper animation to the timeline
    hoverOutTimeline
      .to(
        nameWrapper,
        {
          y: "0", // Move back to original position
          color: "black",
          duration: 0.4,
          scale: 1,
          paddingLeft: "0.25rem", // Reset padding-left
          paddingRight: "0.25rem", // Reset padding-right
          ease: "power2.out",
        },
        0
      )
      .to(
        nameWrapper,
        {
          backgroundColor: "rgba(105,51,250,0)", // Background color reset
          duration: 0.2,
          ease: "power3.out",
        },
        0
      )
      .to(
        mediaEmbed,
        {
          borderRadius: "0.5rem", // Background color animation
          duration: 0.3,
          ease: "ease.out",
        },
        0.1
      )
      .to(
        overlay,
        {
          opacity: "0", // Background color animation
          duration: 0.2,
          ease: "ease.out",
        },
        0
      );
  });
});
