//Text truncate read more read less
document.addEventListener("DOMContentLoaded", function () {
  const readMoreBtns = document.querySelectorAll('[data-button="read more"]');

  if (readMoreBtns.length > 0) {
    readMoreBtns.forEach((readMoreBtn) => {
      const targetId = readMoreBtn.getAttribute("data-target");
      const textContainer = document.querySelector(`[data-text="${targetId}"]`);

      if (textContainer) {
        const lineLimit =
          parseInt(readMoreBtn.getAttribute("data-line-limit")) || 3;

        // Measure the height before truncation
        const originalHeight = textContainer.scrollHeight;

        // Apply line-clamp styles
        textContainer.style.display = "-webkit-box";
        textContainer.style.webkitBoxOrient = "vertical";
        textContainer.style.overflow = "hidden";
        textContainer.style.webkitLineClamp = lineLimit;

        // Measure the height after truncation
        const truncatedHeight = textContainer.offsetHeight;

        // Hide the button if no truncation is needed
        if (originalHeight <= truncatedHeight) {
          readMoreBtn.style.display = "none";
        }

        const originalText = textContainer.textContent.trim();
        let isExpanded = false;

        readMoreBtn.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent page reload

          if (isExpanded) {
            textContainer.style.webkitLineClamp = lineLimit;
            readMoreBtn.textContent = "Read more";
          } else {
            textContainer.style.webkitLineClamp = "none";
            readMoreBtn.textContent = "Read less";
          }
          isExpanded = !isExpanded;
        });
      } else {
        console.error(`No text container found for target: ${targetId}`);
      }
    });
  } else {
    console.error("No read more buttons found on the page.");
  }
});
