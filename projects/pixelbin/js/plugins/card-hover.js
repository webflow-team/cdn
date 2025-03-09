document.querySelectorAll(".home-tools_card").forEach((card) => {
  // Find all videos inside the current card
  const videos = card.querySelectorAll(".tools-video");

  card.addEventListener("mouseenter", () => {
    videos.forEach((video) => {
      // Check if the video is NOT hidden by Webflow
      if (!video.classList.contains("w-condition-invisible")) {
        video.muted = true; // Ensure mute is enabled for autoplay
        video.play().catch((err) => console.log("Autoplay prevented:", err));
      }
    });
  });

  card.addEventListener("mouseleave", () => {
    videos.forEach((video) => {
      if (!video.classList.contains("w-condition-invisible")) {
        video.pause();
        video.currentTime = 0;
      }
    });
  });
});
