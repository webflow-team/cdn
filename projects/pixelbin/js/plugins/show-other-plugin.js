//Ref img - https://cdn.prod.website-files.com/673193e0642e6ad25696fcd4/67bdbd43fe35557c7b455253_Screenshot%202025-02-25%20at%206.23.12%E2%80%AFPM.png
window.onload = function () {
  console.log("Script Loaded: DOM fully loaded.");

  // Get the current product and category
  var currentProductElement = document.querySelector("[data-current-product]");
  if (!currentProductElement) {
    console.error("Current product element not found!");
    return;
  }

  var currentProduct = currentProductElement
    .getAttribute("data-current-product")
    .trim()
    .toLowerCase();

  var currentCategory = currentProductElement
    .getAttribute("data-current-category")
    .trim()
    .toLowerCase();

  console.log("Current Product:", currentProduct);
  console.log("Current Category:", currentCategory);

  // Select all collection items in the "Other Plugins" section
  var pluginItems = document.querySelectorAll(
    ".w-dyn-item[data-product][data-category]"
  );

  if (pluginItems.length === 0) {
    console.warn(
      "No plugin items found with data-product and data-category attributes."
    );
  }

  pluginItems.forEach(function (item, index) {
    var itemProduct = item.getAttribute("data-product").trim().toLowerCase();
    var itemCategory = item.getAttribute("data-category").trim().toLowerCase();

    console.log(
      `Plugin ${
        index + 1
      }: Product = ${itemProduct}, Category = ${itemCategory}`
    );

    // Display only items that match the category and are not the current product
    if (itemCategory === currentCategory && itemProduct !== currentProduct) {
      console.log(
        `Showing Plugin ${index + 1}: Category Match & Not Current Product`
      );
      item.style.display = "block";
    } else {
      console.log(
        `Hiding Plugin ${index + 1}: Category Mismatch or Current Product`
      );
      item.style.display = "none";
    }
  });
};
