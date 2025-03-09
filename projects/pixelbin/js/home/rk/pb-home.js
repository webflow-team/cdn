// HOME HERO -- CARDS

document.addEventListener("DOMContentLoaded", () => {
  // Desktop condition
  if (window.innerWidth > 1024) {
    // Select all elements with the .grid__item class
    const gridItems = document.querySelectorAll(".grid__item");

    gridItems.forEach((item) => {
      // Check if there's a .hero-video inside the current .grid__item
      const heroVideo = item.querySelector(".hero-video");

      if (heroVideo) {
        // On hover (mouseenter), play the video from the start
        item.addEventListener("mouseenter", () => {
          heroVideo.currentTime = 0; // Reset to the start
          heroVideo.play(); // Play the video
        });

        // On hover out (mouseleave), pause the video and reset to the start
        item.addEventListener("mouseleave", () => {
          heroVideo.pause(); // Pause the video
          heroVideo.currentTime = 0; // Reset to the start
        });
      }
    });
  }
});

// --------------------------------------------------------------------------------

// HOME -- IMG TO FULLSCREEN INTERACTION CODE

window.addEventListener("DOMContentLoaded", (event) => {
  // SETUP ELEMENTS
  let targetEl = $("#target"),
    zone1 = $("#wrapper-initial");
  (zone2 = $("#wrapper-sticky")), (button = $("#button"));

  menu = $(".videos-tabs_menu");
  tab = $("#target-tab");
  menuLinks = $(".videos-tabs_menu-link");

  // animating x and y with different easing creates a curve
  let customVars = {
    x: { ease: "ease.out" },
    y: { ease: "power3.out" },
  };

  let state;
  let isReparented = false; // Track reparenting state

  // MENU ANIMATION TL
  const menuTl = gsap.timeline({ paused: true });

  menuTl
    .fromTo(
      menu,
      { opacity: 0, scale: 1, y: "0rem" },
      { opacity: 1, scale: 1, y: "0rem", duration: 0.5, ease: "power1.out" }
    )
    .fromTo(
      menuLinks,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        stagger: "0.10",
        transformOrigin: "50% 50%",
        duration: 0.4,
        ease: "sine.out",
      },
      "0.1"
    );

  // Fullscreen animation GSAP TIMELINE
  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      menuTl.play();
      $("#hero-img-transform").removeClass("is-ab");
      document.querySelector("#first-link").click();
      window.startPlaying = true; // Define the variable globally

      if (!$.contains(zone2[0], targetEl[0])) {
        targetEl.appendTo(zone2); // Move targetEl to zone2
      }
    },
  });

  // Add the gsap.fromTo tween to the same timeline (starting at the same time with "0")
  tl.fromTo(
    "#img-container",
    { scale: 1.1 },
    { scale: 1, ease: "power1.out" },
    "0" // Start both animations together
  );

  // Create ScrollTrigger to scrub through the entire timeline
  ScrollTrigger.create({
    trigger: zone2, // The trigger element
    start: "top 90%", // Start when zone2 hits the bottom of the viewport
    end: "bottom 100%", // End when zone2 is 10% from the top of the viewport
    scrub: true, // Scrub through the timeline based on scroll
    animation: tl, // The timeline to be scrubbed
    once: true, // Ensure the animation plays only once
    markers: false,
    onToggle: ({ isActive, progress }) => {
      if (isActive) {
        // Reparent the element when entering the trigger zone
        state = Flip.getState(targetEl, { props: "borderRadius, opacity" });
        targetEl.appendTo(zone2); // Move targetEl to zone2
        tl.add(
          Flip.from(state, {
            duration: 1,
            custom: customVars,
          }),
          "0"
        );
        isReparented = true;
      } else if (progress !== 1) {
        // Restore the target element when leaving the trigger zone
        state = Flip.getState(targetEl, { props: "borderRadius, opacity" });
        zone1.append(targetEl); // Move targetEl back to originalZone
        isReparented = false;
      }
    },
  });
});

// --------------------------------------------------------------------------------

// HOME --  HERO TABS INTERACTION

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".videos-tabs_menu-link");
  const tabContents = document.querySelectorAll(".videos-tabs_pane");
  const progressBars = document.querySelectorAll(".videos-tabs_menu-link-bar");
  const menu = document.querySelector(".videos-tabs_menu");
  const menuLinks = document.querySelectorAll(".videos-tabs_menu-link");

  let observer;
  let currentVideo = null;
  let currentProgressBar = null;

  window.startPlaying = false; // Define the variable globally

  const setupObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          const tabIndex = entry.target.dataset.tabIndex; // Using data attribute to store the index
          const video = entry.target.querySelector("video");
          const progressBar = progressBars[tabIndex];

          if (entry.isIntersecting) {
            if (video && window.startPlaying) {
              video.play();
              if (progressBar) updateProgressBar(video, progressBar);
            }
          } else {
            if (video) video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    // Add data-tab-index to each tabContent to map it to progressBars
    tabContents.forEach((tabContent, index) => {
      tabContent.dataset.tabIndex = index; // Assign the correct index
      observer.observe(tabContent);
    });
  };

  const updateProgressBar = (video, progressBar) => {
    const update = () => {
      if (!video.paused) {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
        requestAnimationFrame(update);
      }
    };
    progressBar.style.width = "0%"; // Reset progress bar on tab switch
    requestAnimationFrame(update);
  };

  const switchToNextTab = (currentIndex) => {
    const nextIndex = (currentIndex + 1) % tabs.length;
    tabs[nextIndex].click();
  };

  const setActiveTab = (index) => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tabs[index].classList.add("active");
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Pause and reset current video
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }
      if (currentProgressBar) {
        currentProgressBar.style.width = "0%"; // Reset the progress bar
      }

      // Start new video and progress bar
      const tabContent = tabContents[index];
      const video = tabContent.querySelector("video");
      const progressBar = progressBars[index];

      if (video) {
        currentVideo = video;
        currentProgressBar = progressBar; // Assign the new progress bar

        video.currentTime = 0; // Reset video to the beginning
        video.muted = true;
        video.play();
        video.onended = () => switchToNextTab(index);

        if (progressBar) updateProgressBar(video, progressBar);
      }

      // Add active class to clicked tab
      setActiveTab(index);
    });
  });

  setupObserver();
});

// ---------------------------------------------------------------------------
