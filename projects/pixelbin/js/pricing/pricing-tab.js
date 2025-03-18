document.addEventListener("DOMContentLoaded", function () {
  // ----- ADD-ON PRICING FUNCTIONALITY -----
  const pricingValues = {
    1: "9", // Tab 1 price
    2: "19", // Tab 2 price
    3: "29", // Tab 3 price
  };

  const addonTabs = document.querySelectorAll("[data-addon-tab]");
  const priceElement = document.querySelector("[data-addon-value]");

  function updatePrice(tab) {
    const tabIndex = tab.getAttribute("data-addon-tab");
    if (pricingValues[tabIndex]) {
      priceElement.textContent = pricingValues[tabIndex];
    }
  }

  if (addonTabs.length && priceElement) {
    addonTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        updatePrice(this);
      });
    });

    // Get Webflow active tab using `w--current`
    const activeAddonTab = document.querySelector(
      "[data-addon-tab].w--current"
    );
    if (activeAddonTab) updatePrice(activeAddonTab);
  }

  // ----- SUBSCRIPTION PRICING FUNCTIONALITY -----
  const subscriptionTabs = document.querySelectorAll("[data-subscription-tab]");
  const pricingTables = document.querySelectorAll("[data-pricing]");

  function updatePricing() {
    let activeTab = document.querySelector(
      "[data-subscription-tab].w--current"
    ); // Get Webflow's active tab

    if (!activeTab && subscriptionTabs.length > 0) {
      activeTab = subscriptionTabs[0]; // Default to first tab if none found
    }

    const selectedTab = activeTab.getAttribute("data-subscription-tab");

    pricingTables.forEach((table) => {
      table.style.display =
        table.getAttribute("data-pricing") === selectedTab ? "block" : "none";
    });
  }

  subscriptionTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      setTimeout(updatePricing, 100); // Delay to let Webflow update active state
    });
  });

  updatePricing(); // Initialize on page load with the correct Webflow active tab
});
