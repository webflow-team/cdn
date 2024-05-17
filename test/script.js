const button = document.getElementById("toggleButton");
const paragraph = document.getElementById("myParagraph");

button.addEventListener("click", function () {
  paragraph.classList.toggle("hidden");
});
