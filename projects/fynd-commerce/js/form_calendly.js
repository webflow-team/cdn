$(document).ready(function () {
  var input = document.querySelector('[data-input="phone"]');
  (dialCode = document.querySelector(".dialCode")),
    (errorMsg = document.querySelector("#error-msg")),
    (validMsg = document.querySelector("#valid-msg"));

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

  var updateInputValue = function (event) {
    dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
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
  $("#btnSubmit").click(function () {
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
  });
});

//int-tel mobile code end

//International phone number Dial code + Mobile no combined-
$(function () {
  // Trigger when the form is submitted
  $("#contact-form").on("submit", function (e) {
    // Combine the phone parts into the #fullPhone input
    // This will be passed through in the form submit
    $("#fullPhone").val(
      `${$("#dialCode").val()} ${$('[data-input="phone"]').val()}`
    );

    // DEBUG - REMOVE THIS IN YOUR CODE
    // Write the results to the console so we can see if it worked
    console.log(JSON.stringify($("form").serializeArray()));
  });
});

// when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // declare constant selectors
  const FORM_SELECTOR = '[fs-hacks-element="form"]';
  const NAME_INPUT_SELECTOR = '[fs-hacks-element="name-input"]';
  const MESSAGE_SELECTOR = '[fs-hacks-element="custom-message"]';
  const form = document.querySelector(FORM_SELECTOR); // early return

  if (!form) return;
  const nameInput = form.querySelector(NAME_INPUT_SELECTOR);
  const messageDiv = document.querySelector(MESSAGE_SELECTOR);

  if (!nameInput || !messageDiv) return; // when form is submitted

  nameInput.addEventListener("input", function () {
    const nameValue = nameInput.value;

    if (nameValue && nameValue !== "") {
      messageDiv.innerText = `Thanks for reaching out, ${nameValue}. We will get back to you soon.`;
    } else {
      messageDiv.innerText = "Thank you! Your submission has been received!";
    }
  });
});

//Show user's name in a Webflow Form success message
document.addEventListener("DOMContentLoaded", function () {
  // declare constant selectors
  const FORM_SELECTOR = '[fs-hacks-element="form"]';
  const NAME_INPUT_SELECTOR = '[fs-hacks-element="name-input"]';
  const MESSAGE_SELECTOR = '[fs-hacks-element="custom-message"]';
  const form = document.querySelector(FORM_SELECTOR); // early return

  if (!form) return;
  const nameInput = form.querySelector(NAME_INPUT_SELECTOR);
  const messageDiv = document.querySelector(MESSAGE_SELECTOR);

  if (!nameInput || !messageDiv) return; // when form is submitted

  nameInput.addEventListener("input", function () {
    const nameValue = nameInput.value;

    if (nameValue && nameValue !== "") {
      messageDiv.innerText = `Thanks for reaching out, ${nameValue}. We will get back to you soon.`;
    } else {
      messageDiv.innerText = "Thank you! Your submission has been received!";
    }
  });
});

// form validation
$("[data-validate-form='true']").each(function () {
  $(this).validate({
    errorPlacement: function (error, element) {
      error.appendTo(element.closest("[data-errorplace='true']"));
    },
    submitHandler: function (form) {
      var phoneInput = document.querySelector("[data-input='phone']");
      if (!iti.isValidNumber()) {
        // Display error message
        var errorCode = iti.getValidationError();
        var errorMessage =
          errorMap[errorCode] || "Please enter a valid mobile number";
        errorMsg.innerHTML = errorMessage;
        errorMsg.classList.remove("hide");
      } else {
        // Update the input field with the full international number
        phoneInput.value = iti.getNumber();
        // Use native form submission by calling the form's submit method
        form.submit(); // This triggers the Webflow native form submission
      }
    },
  });
});
//Check mobile no when submit is pressed
form.addEventListener("submit", (event) => {
  reset();
  if (!input.value.trim()) {
    showError("Required");
    event.preventDefault(); // Prevent form submission
  } else if (iti.isValidNumber()) {
    validMsg.classList.remove("hide");
  } else {
    const errorCode = iti.getValidationError();
    const msg = errorMap[errorCode] || "Invalid number";
    showError(msg);
    event.preventDefault(); // Prevent form submission
  }
});

//Redirect page  page after 5 seconds
document.addEventListener("submit", function (event) {
  const form = event.target;

  if (form.checkValidity() === false) {
    // Check for errors
    event.preventDefault(); // Prevent form submission
    // Handle error display or messages here
    // ...
  } else {
    event.preventDefault(); // Prevent form submission
    setTimeout(function () {
      window.location.href = "/thank-you"; // Redirect to the desired URL after 5 seconds
    }, 10000);
  }
});

// capture page url
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

//Redirect to calendly
document.addEventListener("submit", function (event) {
  const form = document.querySelector('[data-errorplace="true"]');
  const emailInput = document.querySelector('[data-input="email"]');
  const nameInput = document.querySelector('[data-input="name"]');
  const formBtn = document.querySelector('[data-btn="form-btn"]');
  let originalText = formBtn.value;
  if (form.checkValidity() === false) {
    // Check for errors
    event.preventDefault(); // Prevent form submission
    // Handle error display or messages here
    // ...
  } else {
    event.preventDefault(); // Prevent form submission
    let URL = "https://calendly.com/d/ckd3-yjg-zkt/speak-to-a-fynd-expert"; // Change the URL

    let emailURL = `${URL}?email=${encodeURIComponent(
      emailInput.value
    )}&name=${encodeURIComponent(nameInput.value)}`;

    formBtn.value = "Redirecting...";

    setTimeout(() => {
      window.open(emailURL);
      formBtn.value = originalText;
    }, 2000);
  }
});

//multiselect feild color change
$(".fs-select_field-5").on("change", function () {
  // Reset color for all select fields to default
  $(".fs-select_field-5").css("color", "");

  // Apply the color only to the current select field
  $(this).css("color", "#051E39");
});

// Add class to the specific select text when the toggle is clicked
$(".fs-select_toggle-5-2").on("click", function () {
  // Remove class from all select text fields
  $(".fs-select_text-5-2").removeClass("fs-selected-black");

  // Add class only to the text field related to the clicked toggle
  $(this).find(".fs-select_text-5-2").addClass("fs-selected-black");
});
