// Split text
let typeSplit = new SplitType("[animate]", {
  types: "lines, words, chars",
  tagName: "span",
});

// Function to combine characters
const combineText = (title) => {
  const chars = title.querySelectorAll(".char");
  let combinedText = "";
  console.log("combining " + title);

  chars.forEach((char) => {
    combinedText += char.textContent; // Concatenate the text content of each character
  });

  title.textContent = combinedText; // Set the combined text back to the original element
};

// ---------------------------------------------------------------------------

// const wrapElements = (elems, wrapType, wrapClass) => {
//     elems.forEach((char) => {
//       const wrapEl = document.createElement(wrapType);
//       wrapEl.classList = wrapClass;
//       char.parentNode.appendChild(wrapEl);
//       wrapEl.appendChild(char);
//     });
//   };

//   Splitting();

const subtitle = [
  ...document.querySelectorAll("[animate][data-effect-subtitle]"),
];
const heading = [
  ...document.querySelectorAll("[animate][data-effect-heading]"),
];
const para = [...document.querySelectorAll("[animate][data-effect-para]")];

const fx1Titles = [...document.querySelectorAll("[animate][data-effect-1]")];

const fx2Titles = [...document.querySelectorAll("[animate][data-effect-2]")];

const grids = [...document.querySelectorAll("[el=grid]")];

const buttons = [...document.querySelectorAll("[el=button]")];

const buttonsEarly = [...document.querySelectorAll("[el=button-early]")];

const imageParallax = [...document.querySelectorAll("[has-parallax]")];

// ---------------------------------------------------------------------------

// Define custom easing variables
const customVars = {
  opacityEase: "ease", // Easing for opacity
  scaleEase: "power1.out", // Easing for scale (or any custom easing)
};

// GSAP Scroll Triggers
fx1Titles.forEach((title) => {
  const chars = title.querySelectorAll(".char");
  console.log(chars);

  gsap.fromTo(
    chars,
    {
      "will-change": "opacity, transform",
      opacity: 0,
      scale: 0.7,
      rotationZ: () => gsap.utils.random(-20, 20),
    },
    {
      ease: "power4",
      opacity: 1,
      scale: 1,
      rotation: 0,
      stagger: 0.4,
      duration: 0.6,
      scrollTrigger: {
        trigger: title,
        start: "top 60%",
      },
      onComplete: () => combineText(title), // Call combineText after animation completes
    }
  );
});

fx2Titles.forEach((title) => {
  const chars = title.querySelectorAll(".char");

  gsap.fromTo(
    chars,
    {
      "will-change": "opacity, transform",
      opacity: 0,
      yPercent: 30,
      scaleY: 1.5,
      scaleX: 0.9,
      transformOrigin: "50% 0%",
    },
    {
      duration: 0.6,
      ease: "back.inOut(2)",
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: 0.03,
      duration: 0.6,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
      },
    }
  );
});

heading.forEach((title) => {
  const words = title.querySelectorAll(".word");
  const lines = title.querySelectorAll(".line");

  lines.forEach((char) => {
    char.style.overflow = "hidden";
  });

  gsap.from(words, {
    y: "100%",
    opacity: 0,
    duration: 0.6,
    ease: "circ.out",
    stagger: 0.03,
    scrollTrigger: {
      trigger: title,
      start: "top 70%",
    },
    onComplete: () => console.log("over"), // Call combineText after animation completes
  });
});

subtitle.forEach((title) => {
  const chars = title.querySelectorAll(".char");

  gsap.from(chars, {
    opacity: 0,
    duration: 0.4,
    ease: "power1.out",
    stagger: { amount: 0.1 },
    scrollTrigger: {
      trigger: title,
      start: "top 70%",
    },
    onComplete: () => SplitType.revert(title), // Call combineText after animation completes
  });
});

grids.forEach((grid) => {
  // Get all children of the current grid
  const children = grid.children;

  // Create a timeline for each grid
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: grid, // Trigger animation when the grid is in view
      start: "top 70%", // Start animation when grid reaches 70% from the top
      toggleActions: "play none none none", // Play the animation on scroll
    },
  });

  // Animate opacity with different easing and duration
  tl.from(children, {
    opacity: 0,
    duration: 0.5,
    ease: customVars.opacityEase,
    stagger: 0.1, // Stagger the animation for each child
  });

  // Animate scale with different easing and duration
  tl.from(
    children,
    {
      scale: 0.95,
      duration: 0.7,
      ease: customVars.scaleEase,
      stagger: 0.1, // Stagger the animation for each child
    },
    "<"
  ); // Start at the same time as opacity animation
});

buttons.forEach((button) => {
  // Create a ScrollTrigger for each grid
  gsap.from(button, {
    opacity: 0,
    scale: "0.99",
    duration: 0.8,
    ease: "ease.out",
    scrollTrigger: {
      trigger: button, // Trigger animation when the grid is in view
      start: "top 70%", // Start animation when grid reaches 70% from the top
      toggleActions: "play none none none", // Play the animation on scroll
    },
  });
});

buttonsEarly.forEach((button) => {
  // Create a ScrollTrigger for each grid
  gsap.from(button, {
    opacity: 0,
    scale: "0.99",
    duration: 0.8,
    ease: "ease.out",
    scrollTrigger: {
      trigger: button, // Trigger animation when the grid is in view
      start: "top 80%", // Start animation when grid reaches 70% from the top
      toggleActions: "play none none none", // Play the animation on scroll
    },
  });
});

para.forEach((item) => {
  // Create a ScrollTrigger for each grid
  gsap.from(item, {
    opacity: 0,
    y: "0.5em",
    duration: 0.8,
    ease: "power1.out",
    scrollTrigger: {
      trigger: item, // Trigger animation when the grid is in view
      start: "top 70%", // Start animation when grid reaches 70% from the top
      toggleActions: "play none none none", // Play the animation on scroll
    },
  });
});

imageParallax.forEach((image) => {
  gsap.fromTo(
    image,
    {
      y: "-0.5em",
    },
    {
      y: "0.5em",
      ease: "ease.out",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    }
  );
});