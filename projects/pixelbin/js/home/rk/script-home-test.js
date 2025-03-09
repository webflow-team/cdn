// console.log("testing script loaded!");
// Import GSAP and Lottie if not already available

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
          console.log("test script");
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

// // Utility functions
// const lerp = (a, b, n) => (1 - n) * a + n * b;
// const map = (value, inMin, inMax, outMin, outMax) =>
//   ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

// // Mouse position tracking
// let mousePos = { x: 0, y: 0 };
// window.addEventListener("mousemove", (e) => {
//   mousePos.x = e.clientX;
//   mousePos.y = e.clientY;
// });

// // Movement function
// class MoveableItem {
//   constructor(el) {
//     this.DOM = { el: el };
//     this.translation = { x: 0, y: 0 };
//     this.speedFactor = {
//       x: getRandomNumber(3, 10),
//       y: getRandomNumber(3, 10),
//     };
//     this.active = true; // Determines if the element responds to cursor movement
//     this.init();
//   }

//   init() {
//     this.render();
//   }

//   render() {
//     if (this.active) {
//       const tx = map(mousePos.x, 0, window.innerWidth, -this.speedFactor.x, this.speedFactor.x);
//       const ty = map(mousePos.y, 0, window.innerHeight, -this.speedFactor.y, this.speedFactor.y);

//       this.translation.x = lerp(this.translation.x, tx, 0.1);
//       this.translation.y = lerp(this.translation.y, ty, 0.1);

//       gsap.set(this.DOM.el, {
//         x: this.translation.x,
//         y: this.translation.y,
//       });
//     }

//     requestAnimationFrame(() => this.render());
//   }

//   disableMovement() {
//     this.active = false;
//   }

//   enableMovement() {
//     this.active = true;
//   }
// }

// // Random number utility
// function getRandomNumber(min, max) {
//   return Math.random() * (max - min) + min;
// }

// // Initialize moveable items
// const gridItems = document.querySelectorAll(".grid__item");
// const moveableItems = Array.from(gridItems).map((item) => new MoveableItem(item));

// window.addEventListener("DOMContentLoaded", () => {
//   // SETUP ELEMENTS
//   let targetEl = $("#target"),
//     zone1 = $("#wrapper-initial"),
//     zone2 = $("#wrapper-sticky"),
//     menu = $(".videos-tabs_menu"),
//     menuLinks = $(".videos-tabs_menu-link");

//   let customVars = {
//     x: { ease: "ease.out" },
//     y: { ease: "power3.out" },
//   };

//   // Store Flip state
//   const state = Flip.getState(targetEl, { props: "borderRadius" });

//   // Reparent the target element to zone2
//   targetEl.appendTo(zone2);

//   // MENU ANIMATION TL
//   const menuTl = gsap.timeline({ paused: true });
//   menuTl
//     .fromTo(
//       menu,
//       { opacity: 0, scale: 1, y: "0rem" },
//       { opacity: 1, scale: 1, y: "0rem", duration: 0.5, ease: "power1.out" }
//     )
//     .fromTo(
//       menuLinks,
//       { opacity: 0, scale: 0.95 },
//       {
//         opacity: 1,
//         scale: 1,
//         stagger: "0.10",
//         transformOrigin: "100% 50%",
//         duration: 0.4,
//         ease: "sine.out",
//       },
//       "0.1"
//     );

//   // GSAP timeline
//   const tl = gsap.timeline({
//     paused: true,
//     onStart: () => {
//       moveableItems.forEach((item) => item.disableMovement()); // Disable cursor movement
//     },
//     onComplete: () => {
//       menuTl.play();
//       $("#hero-img-transform").css("opacity", "1");
//       document.querySelector("#first-link").click();
//       window.startPlaying = true; // Define the variable globally
//     },
//   });

//   // Add the Flip animation to the timeline
//   tl.add(
//     Flip.from(state, {
//       duration: 1,
//       custom: customVars,
//     })
//   );

//   // Add the gsap.fromTo tween to the same timeline
//   tl.fromTo(
//     "#img-container",
//     { scale: 1.1 },
//     { scale: 1, ease: "power1.out" },
//     "0" // Start both animations together
//   );

//   // ScrollTrigger
//   ScrollTrigger.create({
//     trigger: zone2,
//     start: "top 90%", // Start when zone2 hits the bottom of the viewport
//     end: "bottom 100%", // End when zone2 is 10% from the top of the viewport
//     scrub: true, // Scrub through the timeline based on scroll
//     animation: tl, // The timeline to be scrubbed
//     onLeaveBack: () => {
//       moveableItems.forEach((item) => item.enableMovement()); // Re-enable cursor movement when scrolling back
//     },
//     once: true, // Ensure the animation plays only once
//     markers: false,
//   });
// });

//-------------------------------------------------------------------------------

// // Utility functions
// const lerp = (a, b, n) => (1 - n) * a + n * b;
// const map = (value, inMin, inMax, outMin, outMax) =>
//   ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

// // Mouse position tracking
// let mousePos = { x: 0, y: 0 };
// window.addEventListener("mousemove", (e) => {
//   mousePos.x = e.clientX;
//   mousePos.y = e.clientY;
// });

// // Movement function
// class MoveableItem {
//   constructor(el) {
//     this.DOM = { el: el };
//     this.translation = { x: 0, y: 0 };
//     this.speedFactor = {
//       x: getRandomNumber(3, 10),
//       y: getRandomNumber(3, 10),
//     };
//     this.init();
//   }

//   init() {
//     this.render();
//   }

//   render() {
//     const tx = map(mousePos.x, 0, window.innerWidth, -this.speedFactor.x, this.speedFactor.x);
//     const ty = map(mousePos.y, 0, window.innerHeight, -this.speedFactor.y, this.speedFactor.y);

//     this.translation.x = lerp(this.translation.x, tx, 0.1);
//     this.translation.y = lerp(this.translation.y, ty, 0.1);

//     gsap.set(this.DOM.el, {
//       x: this.translation.x,
//       y: this.translation.y,
//     });

//     requestAnimationFrame(() => this.render());
//   }
// }

// // // Initialize
// // const gridItems = document.querySelectorAll(".grid__item");
// // gridItems.forEach((item) => new MoveableItem(item));

// // Random number utility
// function getRandomNumber(min, max) {
//   return Math.random() * (max - min) + min;
// }

//-------------------------------------------------------------------------------

// // Mouse position and window size variables
// let mousepos = { x: 0, y: 0 };
// let winsize = { width: window.innerWidth, height: window.innerHeight };

// // Listen for mousemove and window resize events
// window.addEventListener('mousemove', (e) => {
//     mousepos.x = e.clientX;
//     mousepos.y = e.clientY;
// });

// window.addEventListener('resize', () => {
//     winsize.width = window.innerWidth;
//     winsize.height = window.innerHeight;
// });

// // GridItem class definition
// class GridItem {
//     constructor(el) {
//         this.DOM = { el: el };
//         this.move();
//     }

//     move() {
//         let translationVals = { tx: 0, ty: 0 };
//         const xstart = getRandomNumber(5, 20);
//         const ystart = getRandomNumber(5, 20);

//         const render = () => {
//             translationVals.tx = lerp(translationVals.tx, map(mousepos.x, 0, winsize.width, -xstart, xstart), 0.07);
//             translationVals.ty = lerp(translationVals.ty, map(mousepos.y, 0, winsize.height, -ystart, ystart), 0.07);

//             gsap.set(this.DOM.el, { x: translationVals.tx, y: translationVals.ty });
//             requestAnimationFrame(render);
//         };
//         requestAnimationFrame(render);
//     }
// }

// // Grid class definition
// class Grid {
//     constructor(el) {
//         this.DOM = { el: el };
//         this.gridItems = [];
//         this.items = [...this.DOM.el.querySelectorAll('.grid__item')];
//         this.items.forEach(item => this.gridItems.push(new GridItem(item)));

//         this.showItems();
//     }

//     showItems() {
//         gsap.timeline()
//             .set(this.items, { scale: 0.7, opacity: 0 }, 0)
//             .to(this.items, {
//                 duration: 2,
//                 ease: 'Expo.easeOut',
//                 scale: 1,
//                 stagger: { amount: 0.6, grid: 'auto', from: 'center' }
//             }, 0)
//             .to(this.items, {
//                 duration: 3,
//                 ease: 'Power1.easeOut',
//                 opacity: 0.8,
//                 stagger: { amount: 0.6, grid: 'auto', from: 'center' }
//             }, 0);
//     }
// }

// // Initialize the Grid class
// const grid = new Grid(document.querySelector('.grid'));

// // Helper functions
// function getRandomNumber(min, max) {
//     return Math.random() * (max - min) + min;
// }

// function lerp(start, end, t) {
//     return start + (end - start) * t;
// }

// function map(value, in_min, in_max, out_min, out_max) {
//     return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
// }
