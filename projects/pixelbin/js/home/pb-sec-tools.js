// SECTION 5 TOOL CARDS HOVER ANIM

// Helper: Check if device is desktop
const isDesktop = () => window.innerWidth >= 1024;

// Select all the cards
const cards = document.querySelectorAll(".home-tools_card");

cards.forEach((card) => {
  const video = card.querySelector(".tools-video");

  // Safari/iOS-safe video setup
  video.muted = true;
  video.setAttribute("muted", ""); // Required for iOS autoplay
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.preload = "auto";
  video.removeAttribute("loop"); // You control playback manually

  // Optional warm preload if needed (only on desktop)
  if (isDesktop()) {
    video.load(); // Begin loading the video file
  }

  let hoverInTimeline, hoverOutTimeline;

  // Hover In
  card.addEventListener("mouseenter", () => {
    if (!isDesktop()) return;

    if (hoverOutTimeline) hoverOutTimeline.kill();

    try {
      video.pause();
      video.currentTime = 0;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Hover play failed:", err);
        });
      }
    } catch (err) {
      console.error("Video play error:", err);
    }

    /*
    // Un-comment and complete when needed:
    const state = Flip.getState(mediaEmbed);
    card.appendChild(mediaEmbed);
    hoverInTimeline = gsap.timeline();
    hoverInTimeline.add(
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.out",
        absolute: true,
      })
    );
    hoverInTimeline.to(nameWrapper, {
      y: "-1rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      scale: 1.1,
      color: "white",
      duration: 0.4,
      ease: "power2.out",
    }, 0);

    if (!card.classList.contains("no-bg")) {
      hoverInTimeline.to(nameWrapper, {
        backgroundColor: "rgba(105,51,250,1)",
        duration: 0.3,
        ease: "ease.out",
      }, 0.1);
    }

    hoverInTimeline
      .to(mediaEmbed, {
        borderRadius: "1rem",
        duration: 0.3,
        ease: "ease.out",
      }, 0)
      .to(overlay, {
        opacity: "1",
        duration: 0.3,
        ease: "ease.out",
      }, 0.15);
    */
  });

  // Hover Out
  card.addEventListener("mouseleave", () => {
    if (!isDesktop()) return;

    if (hoverInTimeline) hoverInTimeline.kill();

    try {
      video.pause();
      video.currentTime = 0;
    } catch (err) {
      console.error("Video reset error:", err);
    }

    /*
    const state = Flip.getState(mediaEmbed);
    wrapper.appendChild(mediaEmbed);
    hoverOutTimeline = gsap.timeline();

    hoverOutTimeline.add(
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.out",
        absolute: true,
      })
    );

    hoverOutTimeline.to(nameWrapper, {
      y: "0",
      color: "black",
      duration: 0.4,
      scale: 1,
      paddingLeft: "0.25rem",
      paddingRight: "0.25rem",
      ease: "power2.out",
    }, 0);

    if (!card.classList.contains("no-bg")) {
      hoverOutTimeline.to(nameWrapper, {
        backgroundColor: "rgba(105,51,250,0)",
        duration: 0.2,
        ease: "power3.out",
      }, 0);
    }

    hoverOutTimeline
      .to(mediaEmbed, {
        borderRadius: "0.5rem",
        duration: 0.3,
        ease: "ease.out",
      }, 0.1)
      .to(overlay, {
        opacity: "0",
        duration: 0.2,
        ease: "ease.out",
      }, 0);
    */
  });
});
