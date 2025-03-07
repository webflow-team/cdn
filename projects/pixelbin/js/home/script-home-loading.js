window.addEventListener("load", () => {
  tlStart.play(); // Start the animation when the page is fully loaded
});

// Initial Setup
const gridItems = document.querySelectorAll(".grid__item");
gsap.set(gridItems, { scale: 0.7, opacity: 0 });
gsap.set(".videos-tabs_component", { scale: 0.8, opacity: 0 });
gsap.set("#navbar", { yPercent: -100, opacity: 1 });

// Timeline for animations
const tlStart = gsap.timeline({
  onComplete: () => {
    gridItems.forEach((item) => new MoveableItem(item));
  },
});

// Animate the header and navbar
tlStart
  .from(
    "#hero-header",
    {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "Expo.inOut",
    },
    "0.3"
  )
  .to(
    "#navbar",
    {
      yPercent: 0,
      duration: 1,
      ease: "power2.out",
    },
    "0.5"
  );

// Animate grid items and videos-tabs_component
tlStart
  .to(
    gridItems,
    {
      duration: 1.4,
      ease: "Expo.easeOut",
      scale: 1,
      opacity: 1,
      stagger: { amount: 0.6, grid: "auto", from: "center" },
    },
    0.4
  )
  .fromTo(
    ".videos-tabs_component",
    {
      opacity: 0,
      scale: 0.9,
    },
    {
      duration: 1.8,
      ease: "Power1.easeOut",
      opacity: 1,
      scale: 1,
    },
    0.6
  );

//------------------------------------------------------------------------------
// HERO MOUSE MOVE - CARD MOVEMENT CODE

// Utility functions
const lerp = (a, b, n) => (1 - n) * a + n * b;
const map = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

// Mouse position tracking
let mousePos = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
});

// Movement function
class MoveableItem {
  constructor(el) {
    this.DOM = { el: el };
    this.translation = { x: 0, y: 0 };
    this.speedFactor = {
      x: getRandomNumber(3, 10),
      y: getRandomNumber(3, 10),
    };
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const tx = map(
      mousePos.x,
      0,
      window.innerWidth,
      -this.speedFactor.x,
      this.speedFactor.x
    );
    const ty = map(
      mousePos.y,
      0,
      window.innerHeight,
      -this.speedFactor.y,
      this.speedFactor.y
    );

    this.translation.x = lerp(this.translation.x, tx, 0.1);
    this.translation.y = lerp(this.translation.y, ty, 0.1);

    gsap.set(this.DOM.el, {
      x: this.translation.x,
      y: this.translation.y,
    });

    requestAnimationFrame(() => this.render());
  }
}

// Random number utility
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
