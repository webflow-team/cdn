document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('[pb-video-tab="link"]');
  const tabContents = document.querySelectorAll(".video_tab_pane");
  const videos = document.querySelectorAll(".video_tab_video");
  const progressBars = document.querySelectorAll(
    '[pb-video-tab="progressbar"]'
  );

  let observer;
  let currentVideo = null;
  let currentTab = null;
  let currentProgressBar = null;
  let progressInterval = null;

  // Function to pause all videos except the current one
  const pauseAllVideos = () => {
    videos.forEach((video) => {
      if (video !== currentVideo) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Reset all progress bars
    progressBars.forEach((bar) => (bar.style.width = "0%"));
  };

  // Function to switch to the next tab
  const switchToNextTab = () => {
    if (!currentTab) return;

    const currentIndex = Array.from(tabs).indexOf(currentTab);
    const nextIndex = (currentIndex + 1) % tabs.length;

    tabs[nextIndex].click(); // Simulate click on the next tab
  };

  // Function to update progress bar based on video playback
  const updateProgressBar = (video, progressBar) => {
    if (!video || !progressBar) return;

    const update = () => {
      if (!video.paused) {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;

        if (progress < 100) {
          progressInterval = requestAnimationFrame(update);
        }
      }
    };

    // Start updating progress bar without resetting it
    progressInterval = requestAnimationFrame(update);
  };

  // IntersectionObserver to detect if video is in viewport
  const setupObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          const progressBar = entry.target.querySelector(
            '[pb-video-tab="progressbar"]'
          );

          if (entry.isIntersecting) {
            if (video) {
              video.play();
              updateProgressBar(video, progressBar); // Resume progress bar
            }
          } else {
            if (video) {
              video.pause();
              cancelAnimationFrame(progressInterval); // Pause progress bar animation
            }
          }
        });
      },
      { threshold: 0.5 } // At least 50% of video should be visible to play
    );

    tabContents.forEach((content) => observer.observe(content));
  };

  // Attach event listeners to tabs
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      currentTab = tab;
      const video = tabContents[index].querySelector("video");
      const progressBar = progressBars[index];

      if (video) {
        currentVideo = video;
        currentProgressBar = progressBar;
        pauseAllVideos();

        video.play();
        updateProgressBar(video, progressBar);

        // When video ends, switch to the next tab
        video.onended = switchToNextTab;
      }
    });
  });

  setupObserver();

  // Automatically start first tab
  if (tabs.length > 0) {
    tabs[0].click();
  }
});
