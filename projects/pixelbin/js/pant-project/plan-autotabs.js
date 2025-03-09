document.addEventListener("DOMContentLoaded", function () {
  // ---- Helper: activates the chosen item, sets classes, toggles text ----
  function activateItem(items, index) {
    items.forEach((item, i) => {
      // Remove is-active from all items
      item.classList.remove("is-active");

      // Remove is-active from the day label
      const label = item.querySelector(".pp_plan_day_label");
      if (label) label.classList.remove("is-active");

      // Remove is-active from the pill
      const pill = item.querySelector("[pp-day-pill]");
      if (pill) pill.classList.remove("is-active");

      // Inactive tabs get "number only"
      const dayTextEl = pill?.querySelector(".pp_plan_day_text");
      if (dayTextEl) {
        dayTextEl.textContent = i + 1;
      }
    });

    // Now activate the chosen item
    items[index].classList.add("is-active");

    // Add is-active to the day label
    const activeLabel = items[index].querySelector(".pp_plan_day_label");
    if (activeLabel) {
      activeLabel.classList.add("is-active");
    }

    // Add is-active to the pill
    const activePill = items[index].querySelector("[pp-day-pill]");
    if (activePill) {
      activePill.classList.add("is-active");

      // For the newly-active tab, show "Day X"
      const activeTextEl = activePill.querySelector(".pp_plan_day_text");
      if (activeTextEl) {
        activeTextEl.textContent = `Day ${index + 1}`;
      }
    }
  }

  // ---- Main logic: find all pantproject-dayplan-autotabs wrappers ----
  const dayPlanWraps = document.querySelectorAll(
    "[pantproject-dayplan-autotabs]"
  );

  dayPlanWraps.forEach((dayPlanWrap) => {
    // Read autoTabsInterval in seconds, convert to ms
    const autoTabsInterval =
      parseInt(dayPlanWrap.getAttribute("pantproject-dayplan-autotabs"), 10) *
        1000 || 3000;

    const items = Array.from(dayPlanWrap.querySelectorAll("[pp-day-item]"));
    if (!items.length) return;

    // Figure out initial "active" item index or default to 0
    let currentIndex = items.findIndex((i) =>
      i.classList.contains("is-active")
    );
    if (currentIndex < 0) currentIndex = 0;

    // Interval reference so we can start/stop
    let autoTimer = null;

    // Start or resume auto‐rotation
    function startAutoTabs() {
      if (autoTimer) return; // If an interval is already running, do nothing
      autoTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        activateItem(items, currentIndex);
      }, autoTabsInterval);
    }

    // Stop auto‐rotation
    function stopAutoTabs() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    // Kick off by activating the initial item
    activateItem(items, currentIndex);

    // ---- Intersection Observer to track in‐view / out‐of‐view ----
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // In view -> start or resume
            startAutoTabs();
          } else {
            // Out of view -> pause
            stopAutoTabs();
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.1, // fire callback once at least 10% is visible
      }
    );

    // Observe our dayPlanWrap
    observer.observe(dayPlanWrap);
  });
});
