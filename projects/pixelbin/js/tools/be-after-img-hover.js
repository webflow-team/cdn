document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll("[fs-before-after]");

  containers.forEach((container) => {
    const afterImage = container.querySelector("[fs-before-after-side=after]");
    const handle = container.querySelector("[fs-before-after-line]");
    const direction =
      container.getAttribute("fs-before-after-direction") || "horizontal";

    if (!afterImage || !handle) return;

    // Apply initial styles for the container
    container.style.position = "relative";
    container.style.overflow = "hidden";

    // Apply initial styles for the after image
    afterImage.style.position = "absolute";
    afterImage.style.top = "0";
    afterImage.style.left = "0";
    afterImage.style.width = "100%";
    afterImage.style.height = "100%";
    afterImage.style.clipPath =
      direction === "horizontal" ? `inset(0 50% 0 0)` : `inset(50% 0 0 0)`;
    afterImage.style.transition = "clip-path 400ms ease";

    // Apply initial styles for the handle (line)
    handle.style.position = "absolute";
    handle.style.width = "1px"; // Line thickness
    handle.style.height = "100%"; // Full height of the container
    handle.style.background = "#ffff"; // Line color
    handle.style.left = "50%"; // Start at the center
    handle.style.top = "0"; // Align to the top of the container
    handle.style.transition = "left 400ms ease"; // Smooth horizontal movement
    handle.style.pointerEvents = "none"; // Prevent mouse interaction with the line

    const updatePosition = (percentage) => {
      if (direction === "horizontal") {
        // Adjust the clip-path and handle position for horizontal direction
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        handle.style.left = `${percentage}%`;
      } else if (direction === "vertical") {
        // Adjust the clip-path and handle position for vertical direction
        afterImage.style.clipPath = `inset(${100 - percentage}% 0 0 0)`;
        handle.style.top = `${percentage}%`;
      }
    };

    container.addEventListener("mouseenter", () => {
      // Smooth transitions on hover
      handle.style.transition = "left 400ms ease, top 400ms ease";
      afterImage.style.transition = "clip-path 400ms ease";
      updatePosition(50); // Reset to the center on hover
    });

    container.addEventListener("mousemove", (event) => {
      const rect = container.getBoundingClientRect();
      let percentage;

      if (direction === "horizontal") {
        percentage = ((event.clientX - rect.left) / rect.width) * 100;
      } else if (direction === "vertical") {
        percentage = ((event.clientY - rect.top) / rect.height) * 100;
      }

      percentage = Math.max(0, Math.min(100, percentage)); // Clamp percentage between 0 and 100
      updatePosition(percentage); // Update the position dynamically
    });

    container.addEventListener("mouseleave", () => {
      updatePosition(50); // Reset to the center when the mouse leaves
    });
  });
});
