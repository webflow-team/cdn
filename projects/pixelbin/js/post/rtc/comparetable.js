//working code
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(
    '[post_comparetable-component="main"]'
  );
  const prevBtn = wrapper.querySelector(
    '[post-comparetable-pagination="previous"]'
  );
  const nextBtn = wrapper.querySelector(
    '[post-comparetable-pagination="next"]'
  );
  const scrollTracks = wrapper.querySelectorAll(
    '[post-comparetable="scroll-track"]'
  );

  if (window.innerWidth > 767 || !scrollTracks.length) return;

  let currentIndex = 0;
  const columnWidth = 109; // consistent column width
  const totalCols = scrollTracks[0].children.length;

  function updateSlider() {
    const shiftX = -(currentIndex * columnWidth);
    scrollTracks.forEach((track) => {
      track.style.transform = `translateX(${shiftX}px)`;
      track.style.transition = "transform 0.3s ease";
    });

    prevBtn.style.opacity = currentIndex <= 0 ? "0.3" : "1";
    prevBtn.style.pointerEvents = currentIndex <= 0 ? "none" : "auto";
    nextBtn.style.opacity = currentIndex >= totalCols - 1 ? "0.3" : "1";
    nextBtn.style.pointerEvents =
      currentIndex >= totalCols - 1 ? "none" : "auto";
  }

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentIndex < totalCols - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 767) {
      updateSlider();
    }
  });

  // Initial view
  updateSlider();

  // Stripe background rows
  const featureWrapper = wrapper.querySelector(
    '[post-comparetable="features-cells"]'
  );
  if (featureWrapper) {
    const rows = featureWrapper.querySelectorAll('[post-comparetable="row"]');
    rows.forEach((row, index) => {
      if (index % 2 === 1) {
        row.style.backgroundColor = "var(--base-color-surface--surface-10)";
      }
    });
  }
});
