var input = document.querySelector("#phone"),
    errorMsg = document.querySelector("#error-msg"),
    validMsg = document.querySelector("#valid-msg");

const iti = window.intlTelInput(input, {
  allowDropdown: true,
  initialCountry: "auto",
  autoPlaceholder: "polite",
  useFullscreenPopup: false,
  formatAsYouType:false,
  hiddenInput: () => ({ phone: "Full_phone", country: "country_code" }),
  geoIpLookup: function(callback) {
    fetch('https://ipinfo.io?token=c9adadaf33a8e0')
      .then(response => response.json())
      .then(ipjson => callback(ipjson.country))
      .catch(() => callback('in'));
  },
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.10/build/js/utils.js"
});

var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

var updateInputValue = function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      var errorMessage = errorMap[errorCode] || "Please enter a valid mobile number";
		 errorMsg.innerHTML = errorMessage;
     errorMsg.classList.remove("hide");
    }
  }
};

input.addEventListener('blur', updateInputValue);
input.addEventListener('input', reset);
input.addEventListener('countrychange', reset);
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);
