$(document).ready(function () {
  var input = document.querySelector("#phone"),
    dialCode = document.querySelector(".dialCode"),
    errorMsg = document.querySelector("#error-msg"),
    validMsg = document.querySelector("#valid-msg");

  var iti = intlTelInput(input, {
    initialCountry: "auto",
    strictMode: true,
    geoIpLookup: (callback) => {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("in"));
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  var updateInputValue = function (event) {
    dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
    console.log("Dial Code Updated:", dialCode.value);
  };

  input.addEventListener("input", updateInputValue, false);
  input.addEventListener("countrychange", updateInputValue, false);

  var errorMap = [
    "Please enter the valid phone number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];

  var reset = function () {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("errorhide");
    validMsg.classList.add("errorhide");
    // Check if "phone-error" label exists and hide it
    var phoneErrorLabel = document.getElementById("phone-error");
    if (phoneErrorLabel) {
      phoneErrorLabel.style.display = "none";
    }
  };

  // Regular expression for validating phone numbers
  var phoneRegex = /^(?:[0-9]●?){6,14}[0-9]$/;

  // Function to validate phone number
  function isValidPhoneNumber(phoneNumber) {
    return phoneRegex.test(phoneNumber);
  }

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

  input.addEventListener("change", reset);
  input.addEventListener("keyup", reset);

  $(":input[required]").blur(function () {
    if ($(this).val() === "") {
      $(this).addClass("invalid");
    } else {
      $(this).removeClass("invalid");
    }
  });

  // form validation
  $("[data-validate-form='true']").each(function () {
    $(this).validate({
      errorPlacement: function (error, element) {
        error.appendTo(element.closest("[data-errorplace='true']"));
      },
    });
  });

  // Modified form submission handler with HubSpot integration
  $("#contact-form").on("submit", function (e) {
    var requiredFields = $(":input[required]");
    var isValid = true;

    requiredFields.each(function () {
      if ($(this).val() === "") {
        $(this).addClass("invalid");
        isValid = false;
      } else {
        $(this).removeClass("invalid");
      }
    });

    if (!isValid) {
      e.preventDefault();
      return false;
    }

    if (iti.isValidNumber()) {
      var fullNumber = iti.getNumber();
      console.log("Submitting number:", fullNumber);

      // Remove existing hidden phone field if it exists
      $("#full_phone").remove();

      // Add new hidden field with the complete number
      $("<input>")
        .attr({
          type: "hidden",
          id: "full_phone",
          name: "phone",
          value: fullNumber,
        })
        .appendTo(this);

      // Update the original phone input value
      input.value = fullNumber;

      // Let the form submit naturally for Webflow success state
      return true;
    } else {
      e.preventDefault();
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("errorhide");
      return false;
    }
  });
});

// Change color of selected option when selected
$("select").on("change", function () {
  $(this).css("color", "#051E39");
});

//Finsweet page url capture
// when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const SHOW_PAGE_URL_SELECTOR = '[fs-hacks-element="show-page-url"]';
  const PAGE_URL_INPUT_SELECTOR = '[fs-hacks-element="page-url-input"]';
  const pageUrl = document.querySelector(SHOW_PAGE_URL_SELECTOR);
  const pageUrlInput = document.querySelector(PAGE_URL_INPUT_SELECTOR);

  if (!pageUrl || !pageUrlInput) return;
  const url = location.href;

  pageUrlInput.value = url;

  pageUrl.innerText = url;
});

//Reload page on form submission
$(document).ready(function () {
  // Check for click on element with data-reload attribute
  $('[data-reload="true"]').on("click", function () {
    // Reload the page
    location.reload();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Use ipinfo.io to fetch the user's location (no token required for basic usage)
  fetch("https://ipinfo.io/json")
    .then((response) => response.json())
    .then((data) => {
      if (data.country) {
        // Autofill the country field with the detected country name
        document.getElementById("country").value = data.country;
      }
    })
    .catch((error) => console.error("Error fetching the country:", error));
});

//Multiselect Sumoselect config code
$(document).ready(function () {
  $("#mySelect").SumoSelect({
    placeholder: "Select tool", // Placeholder text
    csvDispCount: 1, // Number of selected items to display in the placeholder
    captionFormat: "Selected {0}", // Format for the selected count caption
    captionFormatAllSelected: "All selected", // Caption text when all options are selected
    floatWidth: 300, // Width of the dropdown
    search: false, // Enable search functionality
    searchText: "Search...", // Search input placeholder text
    okCancelInMulti: false,
    //truncateOption: false, // Disable truncation of text for options
    triggerChangeCombined: true, // Show "OK" and "Cancel" buttons in multi-select mode
  });
});

//Refresh page when form submission is sucessful
document.addEventListener("submit", function (event) {
  const form = event.target;

  if (form.checkValidity() === false) {
    // Check for errors
    // Handle error display or messages here
    // ...
  } else {
    setTimeout(function () {
      window.location.reload(); // Refresh page after 5 seconds
    }, 5000);
  }
});
