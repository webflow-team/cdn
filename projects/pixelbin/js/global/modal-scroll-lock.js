var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

$(document).ready(function () {
  // Select all elements with the data-modal attribute
  var modals = document.querySelectorAll("[data-modal]");

  modals.forEach(function (modal) {
    // Create a mutation observer for each modal
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
        if (
          mutationRecord.attributeName === "style" &&
          window.getComputedStyle(modal).getPropertyValue("display") !== "none"
        ) {
          if (iOS) {
            var x = $(window).scrollTop().toFixed();
            $("body").css({
              overflow: "hidden",
              position: "fixed",
              top: "-" + x + "px",
              width: "100vw",
            });
          } else {
            $("body").css("overflow", "hidden");
          }
        } else {
          if (iOS) {
            var t = $("body").css("top").replace("-", "").replace("px", "");
            $("body").css({
              overflow: "auto",
              position: "",
              width: "100vw",
            });
            $("body").animate({ scrollTop: t }, 0);
          } else {
            $("body").css("overflow", "");
          }
        }
      });
    });

    // Attach the mutation observer to each modal
    observer.observe(modal, { attributes: true, attributeFilter: ["style"] });

    // Handle modal open/close with data-modal-open attribute
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        // Check if clicked on the modal itself
        var isOpen = modal.hasAttribute("data-modal-open");
        if (isOpen) {
          modal.removeAttribute("data-modal-open");
        } else {
          modal.setAttribute("data-modal-open", true);
        }
      }
    });
  });
});
