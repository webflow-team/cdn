Webflow.push(function () {
  const btn = document.querySelector('[pb-tool-url="button"]');
  const form = document.querySelector('[data-validate-form="true"]');
  const modal = document.querySelector('[fs-modal-element="modal-1"]');
  const input = document.querySelector('[pb-tool-url="input"] input');

  // --- 1. Add custom validator to check image file extensions ---
  if (btn && form) {
    $.validator.addMethod(
      "imageUrl",
      function (value, element) {
        return this.optional(element) || /\.(jpe?g|png|webp)$/i.test(value);
      },
      "Please enter valid image URL"
    );

    // --- 2. Initialize validation rules for form ---
    $(form).validate({
      errorPlacement: function (error, element) {
        error.appendTo(element.closest("[data-errorplace='true']"));
      },
      rules: {
        "Image-URL": {
          required: true,
          url: true,
          imageUrl: true,
        },
      },
      messages: {
        "Image-URL": {
          required: "Image URL is required.",
          url: "Please enter a valid URL.",
          imageUrl: "Please enter valid image URL", // updated message
        },
      },
      onkeyup: function (element) {
        $(element).valid(); // triggers validation on each keypress
      },
    });

    // --- 3. Redirect to tool page on valid input ---
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      if (!$(form).valid()) return;

      const imageUrl = input?.value?.trim();
      const tool = btn.getAttribute("pb-tool-url-tool-name");

      if (!tool) {
        console.error("Tool name not specified.");
        return;
      }

      const baseUrl = `https://console.pixelbinz0.de/mini-studio/${tool}?url=${imageUrl}`;
      window.location.href = baseUrl;
    });
  }

  // --- 4. Handle clicks on preset examples (auto-redirect) ---
  document.querySelectorAll("[pb-tool-preset-example]").forEach((preset) => {
    preset.addEventListener("click", function (e) {
      e.preventDefault();

      const tool = preset.getAttribute("pb-tool-preset-type");
      const imageUrl = preset.getAttribute("pb-tool-preset-example");

      if (!tool || !imageUrl) {
        console.error("Missing tool type or image URL.");
        return;
      }

      const finalUrl = `https://console.pixelbinz0.de/mini-studio/${tool}?url=${imageUrl}`;
      window.location.href = finalUrl;
    });
  });

  // --- 5. Auto-focus input field when modal becomes visible (display: flex) ---
  if (modal && input) {
    const observer = new MutationObserver(() => {
      const display = window.getComputedStyle(modal).display;
      if (display === "flex") {
        // Delay ensures input is fully visible/focusable
        setTimeout(() => input.focus(), 100);
      }
    });

    observer.observe(modal, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }
});
