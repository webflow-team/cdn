$(document).ready(function () {
  // Phone number validation setup
  var input = document.querySelector('[data-input="phone"]');
  var dialCode = document.querySelector(".dialCode");
  var errorMsg = document.querySelector("#error-msg");
  var validMsg = document.querySelector("#valid-msg");

  var iti = intlTelInput(input, {
    initialCountry: "auto",
    strictMode: true,
    geoIpLookup: (callback) => {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("in"));
    },
  });

  var updateInputValue = function () {
    dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
  };
  input.addEventListener("input", updateInputValue, false);
  input.addEventListener("countrychange", updateInputValue, false);

  // Validate phone on blur
  input.addEventListener("blur", function () {
    reset();
    var phoneNumber = $(this).val();
    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
      $(this).addClass("invalid");
    } else {
      $(this).removeClass("invalid");
    }
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        validMsg.classList.remove("errorhide");
      } else {
        input.classList.add("error");
        var errorCode = iti.getValidationError();
        errorMsg.innerHTML = errorMap[errorCode];
        errorMsg.classList.remove("errorhide");
      }
    }
  });

  // Combine form submission handling into one block
  $('[data-validate-form="true"]').on("submit", function (event) {
    event.preventDefault();
    reset();

    // Check phone number validity
    if (!input.value.trim() || !iti.isValidNumber()) {
      showError("Invalid or missing phone number.");
      return; // Stop if validation fails
    }

    // Additional validation checks
    if (!this.checkValidity()) {
      // Handle form validation errors here
      return;
    }

    // Redirect logic
    if (formShouldRedirectToCalendly()) {
      redirectToCalendly();
    } else {
      // Default thank-you page redirect after 5 seconds
      setTimeout(() => {
        window.location.href = "/thank-you";
      }, 5000); // Corrected to 5 seconds
    }
  });

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove("errorhide");
  }

  function formShouldRedirectToCalendly() {
    // Logic to determine if the form should redirect to Calendly
    // For example, check specific form field values or other conditions
    return false; // Change based on your condition
  }

  function redirectToCalendly() {
    let URL = "https://calendly.com/d/ckd3-yjg-zkt/speak-to-a-fynd-expert";
    let emailInput = document.querySelector('[data-input="email"]').value;
    let nameInput = document.querySelector('[data-input="name"]').value;

    let calendlyURL = `${URL}?email=${encodeURIComponent(
      emailInput
    )}&name=${encodeURIComponent(nameInput)}`;
    window.open(calendlyURL, "_blank");
  }

  // Reset function
  function reset() {
    input.classList.remove("error");
    errorMsg.classList.add("errorhide");
    validMsg.classList.add("errorhide");
  }
});
