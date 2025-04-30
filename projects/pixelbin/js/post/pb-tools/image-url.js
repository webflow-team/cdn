Webflow.push(function () {
  // Handle "Continue" button (for input-based image URL)
  const btn = document.querySelector('[pb-tool-url="button"]');

  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const input = document.querySelector('[pb-tool-url="input"] input');
      const tool = btn.getAttribute("pb-tool-url-tool-name");
      const imageUrl = input?.value?.trim();

      if (!imageUrl) {
        alert("Please enter an image URL.");
        return;
      }

      if (!tool) {
        alert("Tool name not specified.");
        return;
      }

      const baseUrl = `https://console.pixelbinz0.de/mini-studio/${tool}?url=${imageUrl}`;
      window.location.href = baseUrl;
    });
  }

  // Handle "Preset Example" click
  document.querySelectorAll("[pb-tool-preset-example]").forEach((preset) => {
    preset.addEventListener("click", function (e) {
      e.preventDefault();

      const tool = preset.getAttribute("pb-tool-preset-type");
      const imageUrl = preset.getAttribute("pb-tool-preset-example");

      if (!tool || !imageUrl) {
        alert("Missing tool type or image URL.");
        return;
      }

      const finalUrl = `https://console.pixelbinz0.de/mini-studio/${tool}?url=${imageUrl}`;
      window.location.href = finalUrl;
    });
  });

  // Auto-focus input when modal is displayed
  const modal = document.querySelector('[fs-modal-element="modal-1"]');

  if (modal) {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const input = document.querySelector('[pb-tool-url="input"] input');
          if (input) input.focus();
        }
      },
      { threshold: 0.5 } // Adjust if needed
    );

    observer.observe(modal);
  }
});
