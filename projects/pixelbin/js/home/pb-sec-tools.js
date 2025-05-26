//SECTION 5 TOOL CARDS HOVER ANIM

// Select all the cards
const cards = document.querySelectorAll(".home-tools_card");

cards.forEach((card) => {
  //const mediaEmbed = card.querySelector(".home-tools_card-media-embed");
  //const wrapper = card.querySelector(".home-tools_card-media-wrapper");
  //const nameWrapper = card.querySelector(".home-tools_card-name");
  //const overlay = card.querySelector(".home-tools_card-overlay");
  const video = card.querySelector(".tools-video");
  video.muted = true;

  let hoverInTimeline, hoverOutTimeline;

  card.addEventListener("mouseenter", () => {
    // Kill any ongoing hover-out timeline to prevent conflicts
    if (hoverOutTimeline) hoverOutTimeline.kill();
    video.play();
    /*
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
    hoverInTimeline.to(
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
    );

    // Only apply background color animation if the card does NOT have the "no-bg" class
    if (!card.classList.contains("no-bg")) {
      hoverInTimeline.to(
        nameWrapper,
        {
          backgroundColor: "rgba(105,51,250,1)", // Background color animation
          duration: 0.3,
          ease: "ease.out",
        },
        0.1
      );
    }

    hoverInTimeline
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

      */
  });

  card.addEventListener("mouseleave", () => {
    // Kill any ongoing hover-in timeline to prevent conflicts
    if (hoverInTimeline) hoverInTimeline.kill();
    video.pause();
    video.currentTime = 0;
    /*
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
    hoverOutTimeline.to(
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
    );

    // Only reset background color if the card does NOT have the "no-bg" class
    if (!card.classList.contains("no-bg")) {
      hoverOutTimeline.to(
        nameWrapper,
        {
          backgroundColor: "rgba(105,51,250,0)", // Background color reset
          duration: 0.2,
          ease: "power3.out",
        },
        0
      );
    }

    hoverOutTimeline
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
      */
  });
});
