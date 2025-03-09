// Register the ScrollTrigger and FLIP plugin
gsap.registerPlugin(ScrollTrigger);

//nav elements
const nav = document.querySelector("[el=nav-component]");
const navInner = document.querySelector("[el=nav-inner-wrapper]");
const logo = document.querySelector("[el=logo-wrapper]");
const logoText = document.querySelector("[el=logo-text]");
const firstCta = document.querySelector("[el=first-cta]");
const bgShape = document.querySelector("[el=nav-bg-shape]");

// ---------------------------------------------------------------------------

// GSAP timeline for Nav animation
const navShrink = gsap.timeline({ paused: true });

// --------------------------------------------

// Store the natural auto width by temporarily setting the width to auto
gsap.set(navInner, { width: "auto" });
const autoWidth = navInner.offsetWidth; // Get the natural auto width

// Add 2em to the captured auto width
const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize); // Get 1em in pixels
const addedWidth = autoWidth + 1.5 * remToPx; // Add 2em in pixels to the auto width

// Set the width back to 100% before animating
gsap.set(navInner, { width: "100%" });

const animDur = 0.8;
let easeCustom = "power3.inOut";

// --------------------------------------------

// Your GSAP animations (replace with your actual animations)
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
  // .fromTo(
  //   navInner,
  //   {backgroundColor: "rgba(255, 255, 255, 0.0)",},
  //   {backgroundColor: "rgba(255, 255, 255, 0.8)", duration:0.4, ease:"power1.in"},
  //   "0.25"
  // )
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
      backgroundColor: "rgba(105, 51, 252, 1)",
      color: "white",
      duration: 0.6,
      ease: "power1.out",
      onComplete: () => {
        // Add the 'hover-state' class once animation is complete
        //firstCta.classList.add("transformed");
      },
      onReverseComplete: () => {
        // Add the 'hover-state' class once animation is complete
        //firstCta.classList.remove("transformed");
      },
    },
    "0.4"
  )
  //   .to(
  //     ".navbar_menu-link",
  //     {
  //       color: "var(--nav--menu-link-alt)",
  //       duration: 0.5,
  //       ease: "power1.out",
  //       onComplete: function () {
  //         // 'this.targets()' gets the element being animated
  //         $(this.targets()).addClass("transformed");
  //       },
  //       onReverseComplete: function () {
  //         // 'this.targets()' gets the element being animated
  //         $(this.targets()).removeClass("transformed");
  //       },
  //     },
  //     "0.5"
  //   )
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

// Click event listener to Button
document
  .querySelector("[el=nav-animate]")
  .addEventListener("click", function () {
    if (navShrink.reversed()) {
      navShrink.play(); // Play the timeline forward if it's reversed
    } else {
      navShrink.reverse(); // Reverse the timeline if it's playing forward
    }
  });

// ---------------------------------------------------------------------------

ScrollTrigger.matchMedia({
  // Desktop and tablet breakpoints (above 768px)
  "(min-width: 991px)": function () {
    // Create the navshrink animation timeline
    // const navshrink = gsap.timeline({ paused: true });

    // // Define your animation in the timeline (example)
    // navshrink.to(".navbar", { height: "50px", duration: 0.3 });

    // Use ScrollTrigger to manage scroll-based animation
    ScrollTrigger.create({
      trigger: "#home-hero", // The hero section as the trigger
      start: "bottom 5%", // Start animation when the bottom of the hero section hits the top of the viewport
      onEnter: () => navShrink.timeScale(1).play(), // Play the navshrink animation when scrolling past the hero
      onLeaveBack: () => navShrink.timeScale(1.125).reverse(), // Reverse the animation when scrolling back into the hero section
    });
  },
  // You can add more breakpoints if needed
});
