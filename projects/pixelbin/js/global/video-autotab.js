document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('[pb-video-tab="link"]');
  const tabContents = document.querySelectorAll('[pb-video-tab="pane"]');
  const videos = document.querySelectorAll('[pb-video-tab="video"]');
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

    // Reset all progress bars except the current one
    progressBars.forEach((bar) => {
      if (bar !== currentProgressBar) {
        bar.style.width = "0%";
      }
    });
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

    cancelAnimationFrame(progressInterval); // Stop any previous animation

    const update = () => {
      if (!video.paused && video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;

        if (progress < 100) {
          progressInterval = requestAnimationFrame(update);
        }
      }
    };

    // Ensure progress bar updates immediately
    progressBar.style.width = "0%";
    setTimeout(() => requestAnimationFrame(update), 50);
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

          if (video) {
            if (entry.isIntersecting) {
              video.play();
              updateProgressBar(video, progressBar); // Resume progress bar
            } else {
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

        video.currentTime = 0;
        video.play();

        // Ensure progress bar starts instantly
        updateProgressBar(video, progressBar);

        // When video ends, switch to the next tab
        video.onended = switchToNextTab;
      }
    });
  });

  setupObserver();

  // ✅ Fully Fixed: Ensure progress bar starts when first video loads
  if (tabs.length > 0) {
    const firstTab = tabs[0];
    const firstVideo = tabContents[0].querySelector("video");
    const firstProgressBar = progressBars[0];

    firstTab.click(); // Ensure first tab is selected

    if (firstVideo) {
      if (firstVideo.readyState >= 2) {
        // Video is already loaded, start progress bar
        updateProgressBar(firstVideo, firstProgressBar);
      } else {
        // Wait until metadata is loaded, then start progress bar
        firstVideo.onloadedmetadata = () => {
          updateProgressBar(firstVideo, firstProgressBar);
        };
      }
    }
  }
});
