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

  // First GSAP timeline
  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      menuTl.play();
      $("#hero-img-transform").removeClass("is-ab");
      document.querySelector("#first-link").click();
      window.startPlaying = true; // Define the variable globally
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

// onStart: () => {
//     state = Flip.getState(targetEl, {props:'borderRadius'});
//     targetEl.appendTo(zone2);

//     tl.add(Flip.from(state, {
//         duration: 1,
//         custom: customVars
//         }),"0");
// },

// Add the Flip animation to the timeline
// tl.add(Flip.from(state, {
// duration: 1,
// custom: customVars
// }));

// Add the gsap.fromTo tween to the same timeline (starting at the same time with "0")
// tl.fromTo(tab,
//     { opacity: 0.6},
//     { opacity: 1, ease: "power1.out" },
// "0" // Start both animations together
// );

// // Add the gsap.fromTo tween to the same timeline (starting at the same time with "0")
// tl.fromTo(targetEl,
// { opacity: 0.8 },
// { opacity: 1, ease: "power3.out" },
// "0" // Start both animations together
// );

// onEnter: () => {
//     console.log("OnEnter");
//     if (!isReparented) {
//         // Reparent the element and trigger Flip animation
//         state = Flip.getState(targetEl, { props: "borderRadius" });
//         targetEl.appendTo(zone2); // Move targetEl to zone2
//         tl.add(Flip.from(state, {
//                     duration: 1,
//                     custom: customVars
//                     }),"0");
//         isReparented = true; // Update state
//     }
// },
// onLeaveBack: () => {
//     console.log("OnLeaveBack");
//     if (isReparented) {
//         // Restore the target element to its original parent
//         state = Flip.getState(targetEl, { props: "borderRadius" });
//         zone1.append(targetEl); // Move targetEl back to originalZone
//         isReparented = false; // Update state
//     }
// }
