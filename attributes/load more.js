// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const readMoreBtns = document.querySelectorAll(
    '[ff-data-button="read more"]'
  );

  if (readMoreBtns.length > 0) {
    readMoreBtns.forEach((readMoreBtn) => {
      // Find the nearest parent with the data-folder="lg" attribute
      const featureComponent = readMoreBtn
        .closest('[data-folder="lg"]')
        .querySelector('[data-feature="feature-component"]');

      if (featureComponent) {
        const featureItems = featureComponent.querySelectorAll(
          '[data-feature="feature-item"]'
        );
        const itemsToShow =
          parseInt(featureComponent.getAttribute("data-count")) || 3; // Default to 3 if no attribute is provided
        let expanded = false; // State to track if it's expanded or not

        // Hide all cards except the number defined in data-count
        function hideItems() {
          featureItems.forEach((item, index) => {
            if (index >= itemsToShow) {
              item.style.display = "none";
            }
          });
        }

        // Show all items when "Read More" is clicked
        function showItems() {
          featureItems.forEach((item) => {
            item.style.display = "block";
          });
        }

        // Toggle between Read More and Read Less
        function toggleReadMore() {
          const icon = readMoreBtn.querySelector("[data-icon]"); // Find the icon element using a data attribute

          if (expanded) {
            hideItems();
            readMoreBtn.querySelector("div").textContent = "View More";

            // Change icon to "down"
            if (icon) icon.setAttribute("data-icon", "down");

            // Reset scroll position to the bottom of the featureComponent when collapsing
            featureComponent.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          } else {
            showItems();
            readMoreBtn.querySelector("div").textContent = "View Less";

            // Change icon to "up"
            if (icon) icon.setAttribute("data-icon", "up");
          }
          expanded = !expanded; // Toggle the state
        }

        // Initially hide items and set click event
        hideItems();
        readMoreBtn.addEventListener("click", function (e) {
          e.preventDefault(); // Prevent default anchor behavior
          toggleReadMore();
        });
      } else {
        console.error("Feature component not found for the read more button.");
      }
    });
  } else {
    console.error("No read more buttons found on the page.");
  }
});
