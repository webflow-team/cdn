document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".videos-tabs_menu-link");
  const tabContents = document.querySelectorAll(".videos-tabs_pane");
  const progressBars = document.querySelectorAll(".videos-tabs_menu-link-bar");
  const menu = document.querySelector(".videos-tabs_menu");
  const menuLinks = document.querySelectorAll(".videos-tabs_menu-link");

  let observer;
  let currentVideo = null;
  let currentProgressBar = null;

  window.startPlaying = false; // Define the variable globally

  const setupObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          const tabIndex = entry.target.dataset.tabIndex; // Using data attribute to store the index
          const video = entry.target.querySelector("video");
          const progressBar = progressBars[tabIndex];

          if (entry.isIntersecting) {
            if (video && window.startPlaying) {
              video.play();
              if (progressBar) updateProgressBar(video, progressBar);
            }
          } else {
            if (video) video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    // Add data-tab-index to each tabContent to map it to progressBars
    tabContents.forEach((tabContent, index) => {
      tabContent.dataset.tabIndex = index; // Assign the correct index
      observer.observe(tabContent);
    });
  };

  const updateProgressBar = (video, progressBar) => {
    const update = () => {
      if (!video.paused) {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
        requestAnimationFrame(update);
      }
    };
    progressBar.style.width = "0%"; // Reset progress bar on tab switch
    requestAnimationFrame(update);
  };

  const switchToNextTab = (currentIndex) => {
    const nextIndex = (currentIndex + 1) % tabs.length;
    tabs[nextIndex].click();
  };

  const setActiveTab = (index) => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tabs[index].classList.add("active");
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Pause and reset current video
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }
      if (currentProgressBar) {
        currentProgressBar.style.width = "0%"; // Reset the progress bar
      }

      // Start new video and progress bar
      const tabContent = tabContents[index];
      const video = tabContent.querySelector("video");
      const progressBar = progressBars[index];

      if (video) {
        currentVideo = video;
        currentProgressBar = progressBar; // Assign the new progress bar

        video.currentTime = 0; // Reset video to the beginning
        video.muted = true;
        video.play();
        video.onended = () => switchToNextTab(index);

        if (progressBar) updateProgressBar(video, progressBar);
      }

      // Add active class to clicked tab
      setActiveTab(index);
    });
  });

  setupObserver();
});
