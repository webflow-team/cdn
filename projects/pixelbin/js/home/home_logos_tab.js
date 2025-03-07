document.addEventListener("DOMContentLoaded", function () {
  // Select the tab menu
  let tabMenu = document.querySelector(".home_logos_tab_menu");

  // Get the text from the data attribute
  let customText = tabMenu?.getAttribute("data-custom-text");

  if (customText) {
    let texts = customText.split(",");

    // Create and insert the first text
    let firstTextDiv = document.createElement("div");
    firstTextDiv.className = "home_logos_tab_text";
    firstTextDiv.textContent = texts[0].trim();
    tabMenu.prepend(firstTextDiv);

    // Find the "Enterprises" tab link
    let tabLinks = tabMenu.querySelectorAll("a.home_logos_tab_link.w-tab-link");
    if (tabLinks.length > 1) {
      let enterprisesTab = tabLinks[1];

      // Create a separate div for "and"
      let andTextDiv = document.createElement("div");
      andTextDiv.className = "home_logos_tab_text";
      andTextDiv.textContent = texts[1].trim();

      // Insert "and" after the Enterprises tab but before the next tab link
      enterprisesTab.insertAdjacentElement("afterend", andTextDiv);
    }
  }

  function setupAutomaticTabs(tabContainer) {
    let tabLinks = Array.from(
      tabContainer.querySelectorAll("a.home_logos_tab_link.w-tab-link")
    );

    if (tabLinks.length === 0) return;

    let switchTabs = () => {
      let activeTab = tabContainer.querySelector(".w--current");
      let currentIndex = tabLinks.indexOf(activeTab);
      let nextIndex = (currentIndex + 1) % tabLinks.length;
      tabLinks[nextIndex].click();
    };

    // Get interval time from attribute or default to 3000ms
    let intervalTime =
      1000 * Number(tabContainer.getAttribute("r-automatic-tabs")) || 3000;

    let interval = setInterval(switchTabs, intervalTime);

    // Restart automatic switching when a tab is clicked
    tabLinks.forEach((tab) => {
      tab.addEventListener("click", () => {
        clearInterval(interval);
        interval = setInterval(switchTabs, intervalTime);
      });
    });

    // Ensure it restarts if Webflow rerenders (observing the tab container)
    let observer = new MutationObserver(() => {
      clearInterval(interval);
      interval = setInterval(switchTabs, intervalTime);
    });

    observer.observe(tabContainer, { childList: true, subtree: true });
  }

  document.querySelectorAll("[r-automatic-tabs]").forEach(setupAutomaticTabs);
});
