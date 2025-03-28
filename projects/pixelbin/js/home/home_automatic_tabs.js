document.addEventListener("DOMContentLoaded", function () {
  // 1. Find the element with home-automatic-tabs
  const tabMenu = document.querySelector("[home-automatic-tabs]");
  if (!tabMenu) return;

  // 2. Convert attribute to ms (e.g., 3 -> 3000)
  const autoInterval =
    parseInt(tabMenu.getAttribute("home-automatic-tabs") || "0", 10) * 1000;

  // 3. Collect all <button class="home_logos_tab_link"> as tab links
  const tabLinks = Array.from(
    tabMenu.querySelectorAll("button.home_logos_tab_link")
  );

  // 4. Find the .home_logos_tab_content wrapper + all .home_logos_tab_pane
  const contentWrapper = document.querySelector(".home_logos_tab_content");
  if (!contentWrapper) return;
  const tabPanes = Array.from(
    contentWrapper.querySelectorAll(".home_logos_tab_pane")
  );

  // Check for matching counts
  if (tabLinks.length !== tabPanes.length) {
    console.error(
      "Mismatch: # of tab links != # of tab panes. Adjust your Webflow structure."
    );
    return;
  }

  // 5. Find which tab is initially is-current
  let currentIndex = tabLinks.findIndex((link) =>
    link.classList.contains("is-current")
  );
  if (currentIndex < 0) currentIndex = 0; // fallback if none

  // Switch to a specific tab
  function goToTab(index) {
    tabLinks.forEach((link) => link.classList.remove("is-current"));
    tabPanes.forEach((pane) => pane.classList.remove("is-current"));

    tabLinks[index].classList.add("is-current");
    tabPanes[index].classList.add("is-current");
    currentIndex = index;

    resetProgressAnimation(index);
  }

  function resetProgressAnimation(index) {
    const loadBar = tabLinks[index].querySelector(".c-autotabs_load");
    if (!loadBar) return;

    loadBar.style.transition = "none";
    loadBar.style.width = "0";
    void loadBar.offsetWidth;
    loadBar.style.transition = `width linear ${autoInterval / 1000}s`;
    loadBar.style.width = "100%";
  }

  function nextTab() {
    const nextIndex = (currentIndex + 1) % tabLinks.length;
    goToTab(nextIndex);
  }

  let autoTimer = null;
  function startAutoTabs() {
    if (autoInterval > 0) {
      autoTimer = setInterval(nextTab, autoInterval);
    }
  }
  function stopAutoTabs() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Initialize
  goToTab(currentIndex);
  startAutoTabs();

  // Click event
  tabLinks.forEach((link, idx) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      stopAutoTabs();
      goToTab(idx);
      startAutoTabs();
    });
  });
});
