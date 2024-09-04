$(document).ready(function () {
  const input = document.querySelector('[data-input="phone"]');
  const dialCode = document.querySelector(".dialCode");
  const errorMsg = document.querySelector("#error-msg");
  const validMsg = document.querySelector("#valid-msg");

  const iti = intlTelInput(input, {
    initialCountry: "auto",
    strictMode: true,
    geoIpLookup: (callback) => {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("in"));
    },
  });

  const updateInputValue = function () {
    dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
  };
  input.addEventListener("input", updateInputValue);
  input.addEventListener("countrychange", updateInputValue);

  const errorMap = [
    "Please enter a valid phone number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];

  const reset = function () {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("errorhide");
    validMsg.classList.add("errorhide");
  };

  const isValidPhoneNumber = (phoneNumber) =>
    /^(?:[0-9-.\s()+]){6,15}$/.test(phoneNumber);

  input.addEventListener("blur", function () {
    reset();
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        validMsg.classList.remove("errorhide");
      } else {
        input.classList.add("error");
        const errorCode = iti.getValidationError();
        errorMsg.innerHTML = errorMap[errorCode];
        errorMsg.classList.remove("errorhide");
      }
    }
  });

  input.addEventListener("change", reset);
  input.addEventListener("keyup", reset);

  $(":input[required]").blur(function () {
    $(this).toggleClass("invalid", $(this).val() === "");
  });

  // Submit handling for the form
  $('[data-validate-form="true"]').on("submit", function (e) {
    $("#fullPhone").val(
      `${$("#dialCode").val()} ${$('[data-input="phone"]').val()}`
    );
  });

  // Form validation setup
  $("[data-validate-form='true']").each(function () {
    $(this).validate({
      errorPlacement: function (error, element) {
        error.appendTo(element.closest("[data-errorplace='true']"));
      },
      submitHandler: function (form) {
        if (!iti.isValidNumber()) {
          const errorCode = iti.getValidationError();
          const errorMessage =
            errorMap[errorCode] || "Please enter a valid mobile number";
          errorMsg.innerHTML = errorMessage;
          errorMsg.classList.remove("hide");
        } else {
          input.value = iti.getNumber();
          form.submit();
        }
      },
    });
  });

  // Form specific to "speak-expert"
  const speakExpertForm = document.querySelector('[data-form="speak-expert"]');
  if (speakExpertForm) {
    speakExpertForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!this.checkValidity()) return;
      setTimeout(() => {
        window.location.href = "/thank-you";
      }, 5000);
    });
  }

  // Handling Calendly redirection
  if (form && emailInput && nameInput && formBtn) {
    let originalText = formBtn.value;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) return;
      const emailURL = `https://calendly.com/d/ckd3-yjg-zkt/speak-to-a-fynd-expert?email=${encodeURIComponent(
        emailInput.value
      )}&name=${encodeURIComponent(nameInput.value)}`;
      formBtn.value = "Redirecting...";
      setTimeout(() => {
        window.open(emailURL, "_blank");
        formBtn.value = originalText;
      }, 2000);
    });
  }
});
