document.addEventListener("DOMContentLoaded", function () {
  const contents = document.querySelectorAll(
    '[data-fs-sticky-element="content"]'
  );
  const images = document.querySelectorAll('[data-fs-sticky-element="image"]');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove 'w--current' class from all elements and set images opacity to 0
          contents.forEach((content, index) => {
            content.classList.remove("w--current");
            images[index].style.opacity = "0";
          });
          // Add 'w--current' class to the current element and set corresponding image opacity to 1
          entry.target.classList.add("w--current");
          const currentIndex = Array.from(contents).indexOf(entry.target);
          images[currentIndex].style.opacity = "1";
        } else {
          entry.target.classList.remove("w--current");
        }
      });
    },
    { threshold: 0.5 }
  );

  contents.forEach((content) => {
    observer.observe(content);
  });
});
