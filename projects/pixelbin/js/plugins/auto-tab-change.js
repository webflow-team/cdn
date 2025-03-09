document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".videos-tabs_menu-link");
  const tabContents = document.querySelectorAll(".videos-tabs_pane");
  const progressBars = document.querySelectorAll(".videos-tabs_menu-link-bar");
  const indicator = document.createElement("div");
  indicator.classList.add("tab-indicator");
  document.querySelector(".videos-tabs_menu").appendChild(indicator);

  let observer;
  let currentVideo = null;
  let currentProgressBar = null;

  window.startPlaying = true; // Auto-play enabled by default

  const isMobileOrTablet = () =>
    window.matchMedia("(max-width: 991px)").matches;

  const setupObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const tabIndex = entry.target.dataset.tabIndex;
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

    tabContents.forEach((tabContent, index) => {
      tabContent.dataset.tabIndex = index;
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
    progressBar.style.width = "0%";
    requestAnimationFrame(update);
  };

  const switchToNextTab = (currentIndex) => {
    const nextIndex = (currentIndex + 1) % tabs.length;
    tabs[nextIndex].click();
  };

  const setActiveTab = (index) => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tabs[index].classList.add("active");
    if (isMobileOrTablet()) {
      moveIndicator(tabs[index]);
    }
  };

  const moveIndicator = (activeLink) => {
    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = activeLink.parentNode.getBoundingClientRect();

    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${
      linkRect.left - containerRect.left
    }px)`;
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }
      if (currentProgressBar) {
        currentProgressBar.style.width = "0%";
      }

      const tabContent = tabContents[index];
      const video = tabContent.querySelector("video");
      const progressBar = progressBars[index];

      if (video) {
        currentVideo = video;
        currentProgressBar = progressBar;

        video.currentTime = 0;
        video.muted = true;
        video.play();
        video.onended = () => switchToNextTab(index);

        if (progressBar) updateProgressBar(video, progressBar);
      }

      setActiveTab(index);
    });

    if (tab.classList.contains("w--current") && isMobileOrTablet()) {
      moveIndicator(tab);
    }
  });

  setupObserver();

  if (tabs.length > 0) {
    tabs[0].click();
    window.startPlaying = true;
  }

  window.addEventListener("resize", () => {
    if (isMobileOrTablet()) {
      const activeTab = document.querySelector(".videos-tabs_menu-link.active");
      if (activeTab) moveIndicator(activeTab);
    } else {
      indicator.style.width = "0";
    }
  });
});
