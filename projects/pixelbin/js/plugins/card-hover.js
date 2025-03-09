document.querySelectorAll(".home-tools_card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    // Find all videos inside the card
    const videos = card.querySelectorAll(".tools-video");

    // Find the first video that is not hidden by Webflow
    const visibleVideo = Array.from(videos).find(
      (video) => !video.classList.contains("w-condition-invisible")
    );

    if (visibleVideo) {
      visibleVideo.muted = true; // Ensure it's muted for autoplay compliance
      visibleVideo
        .play()
        .catch((err) => console.log("Autoplay prevented:", err));
    }
  });

  card.addEventListener("mouseleave", () => {
    const videos = card.querySelectorAll(".tools-video");

    // Pause only the currently visible video
    const visibleVideo = Array.from(videos).find(
      (video) => !video.classList.contains("w-condition-invisible")
    );

    if (visibleVideo) {
      visibleVideo.pause();
      visibleVideo.currentTime = 0;
    }
  });
});
