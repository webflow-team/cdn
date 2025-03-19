document.addEventListener("DOMContentLoaded", () => {
  const tabMenu = document.querySelector('[pb-auto-scroll-tabs="mobile"]'); // Updated attribute for tab menu
  const tabs = document.querySelectorAll('[pb-video-tab="link"]');

  if (!tabMenu || tabs.length === 0) return;

  const scrollActiveTabIntoView = (activeTab) => {
    if (window.innerWidth <= 1024) {
      // Apply only on tablet and mobile
      const menuWidth = tabMenu.clientWidth;
      const tabWidth = activeTab.clientWidth;
      const tabOffset = activeTab.offsetLeft;

      // Calculate the target scroll position to center the active tab
      const scrollPosition = tabOffset - menuWidth / 2 + tabWidth / 2;

      tabMenu.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Attach click event listener to each tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      scrollActiveTabIntoView(tab);
    });
  });

  // Ensure the first active tab is in view on load
  const activeTab = document.querySelector(
    '[pb-video-tab="link"][aria-selected="true"]'
  );
  if (activeTab) {
    setTimeout(() => scrollActiveTabIntoView(activeTab), 200);
  }
});
