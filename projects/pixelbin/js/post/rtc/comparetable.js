document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(
    '[post_comparetable-component="main"]'
  );

  wrappers.forEach((wrapper) => {
    const prevBtn = wrapper.querySelector(
      '[post-comparetable-pagination="previous"]'
    );
    const nextBtn = wrapper.querySelector(
      '[post-comparetable-pagination="next"]'
    );
    const scrollTracks = wrapper.querySelectorAll(
      '[post-comparetable="scroll-track"]'
    );
    const featureWrapper = wrapper.querySelector(
      '[post-comparetable="features-cells"]'
    );

    if (!scrollTracks.length) return;

    const columnWidth = 109;
    const totalCols = scrollTracks[0].children.length;

    // Local state per wrapper
    let currentIndex = 0;

    const updateSlider = () => {
      if (window.innerWidth > 767) {
        scrollTracks.forEach((track) => {
          track.style.transform = "";
          track.style.transition = "";
        });
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
        return;
      }

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
    };

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

    // Stripe background rows
    if (featureWrapper) {
      const rows = featureWrapper.querySelectorAll('[post-comparetable="row"]');
      rows.forEach((row, index) => {
        if (index % 2 === 1) {
          row.style.backgroundColor = "var(--base-color-surface--surface-10)";
        }
      });
    }

    // Individual resize observer
    const resizeObserver = new ResizeObserver(() => updateSlider());
    resizeObserver.observe(document.body); // observe document body for simplicity

    updateSlider(); // initial setup
  });
});
